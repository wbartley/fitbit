Fitbit.whitelistedFields = ['encodedId', 'displayName'];

Oauth.registerService('fitbit', 1, Fitbit._urls, function(oauthBinding) {
  var identity = oauthBinding.get('http://api.fitbit.com/1/user/-/profile.json').data;

  var serviceData = {
    id: identity.user.encodedId,
    displayName: identity.user.displayName,
    accessToken: oauthBinding.accessToken,
    accessTokenSecret: oauthBinding.accessTokenSecret
  };

  // include helpful fields from Fitbit
  var fields = _.pick(identity, Fitbit.whitelistedFields);
  _.extend(serviceData, fields);

  return {
    serviceData: serviceData,
    options: {
      profile: {
        name: identity.user.fullName
      }
    }
  };
});


Fitbit.retrieveCredential = function(credentialToken) {
  return Oauth.retrieveCredential(credentialToken);
};