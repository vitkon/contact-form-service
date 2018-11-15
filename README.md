# Contact Form Service

Contact form service for [www.appfocused.com](https://www.appfocsued.com)

## Development and deployment notes

Testing an endpoint:

```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"email":"joe@smyth.com","name":"Joe Smyth","content":"Wazzup"}' \
  https://xxxxxxasdasd.execute-api.us-east-1.amazonaws.com/production/email/send
```

## custom domain

### step 1

npm install serverless-domain-manager --save-dev

```yml
custom:
  settings: ${file(settings.json)}
  customDomain:
    domainName: api.appfocused.com
    certificateName: "www.appfocused.com"
    basePath: ""
    stage: ${self:provider.stage}
    createRoute53Record: true
```

### step 2

`sls create_domain`

### domain mapping

This is how the default mapping works:
https://xxxxxxasdasd.execute-api.us-east-1.amazonaws.com/dev/myEndpoint
https://mydomain.com/myEndpoint

### gatsby integration

### cloudfront allow post
https://stackoverflow.com/questions/31253694/this-distribution-is-not-configured-to-allow-the-http-request

### References

- https://dev.to/adnanrahic/building-a-serverless-contact-form-with-aws-lambda-and-aws-ses-4jm0
- https://www.smashingmagazine.com/2018/05/building-serverless-contact-form-static-website/
- https://github.com/amplify-education/serverless-domain-manager
- https://serverless.com/blog/serverless-api-gateway-domain/
- https://www.gatsbyjs.org/docs/api-proxy/
