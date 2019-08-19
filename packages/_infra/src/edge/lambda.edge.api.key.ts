import cdk = require('@aws-cdk/core');
import iam = require('@aws-cdk/aws-iam');
import lambda = require('@aws-cdk/aws-lambda');
import dynamoDb = require('@aws-cdk/aws-dynamodb');
import { RetentionDays } from '@aws-cdk/aws-logs';
import { Const } from '@basemaps/shared';
import { VersionUtil } from '../version';
import { ApiKeyTableArn } from '../api.key.db';

const CODE_PATH = '../lambda-api-tracker/dist';
/**
 * Create a API Key validation edge lambda
 */
export class LambdaApiKeyValidator extends cdk.Construct {
    public lambda: lambda.Function;
    public version: lambda.Version;

    public constructor(scope: cdk.Stack, id: string) {
        super(scope, id);

        // Allow the lambda function to be run as a edge lambda as well as a regular lambda
        const lambdaRole = new iam.Role(this, 'AllowLambdaServiceToAssumeRole', {
            assumedBy: new iam.CompositePrincipal(
                new iam.ServicePrincipal('lambda.amazonaws.com'),
                new iam.ServicePrincipal('edgelambda.amazonaws.com'),
            ),
            managedPolicies: [{ managedPolicyArn: 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole' }],
        });

        this.lambda = new lambda.Function(this, 'ApiValidatorFunction', {
            runtime: lambda.Runtime.NODEJS_8_10,
            handler: 'index.handler',
            code: lambda.Code.asset(CODE_PATH),
            role: lambdaRole,
            logRetention: RetentionDays.ONE_MONTH,
        });

        // Allow access to all dynamoDb tables with the same name
        const dynamoPolicy = new iam.PolicyStatement();
        dynamoPolicy.addActions('dynamoDB:getItem', 'dynamoDB:putItem', 'dynamodb:UpdateItem');
        dynamoPolicy.addResources(ApiKeyTableArn.getArn(scope));
        lambdaRole.addToPolicy(dynamoPolicy);

        // CloudFront requires a specific version for a lambda,
        // so using a hash of the source code create a version
        this.version = this.lambda.addVersion(':sha256:' + VersionUtil.hash(CODE_PATH));

        // Output the edge lambda's ARN
        new cdk.CfnOutput(this, 'LambdaApiKeyValidator', {
            value: cdk.Fn.join(':', [this.lambda.functionArn, this.version.version]),
        });
    }
}
