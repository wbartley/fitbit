Fitbit.whitelistedFields = ['encodedId', 'displayName'];

Oauth.registerService('fitbit', 1, Fitbit._urls, function(oauthBinding) {
  var identity = oauthBinding.get('https://api.fitbit.com/1/user/-/profile.json').data;

  var serviceData = {
    id: identity.user.encodedId,
    name: identity.user.displayName,
    accessToken: oauthBinding.accessToken,
    accessTokenSecret: oauthBinding.accessTokenSecret
  };

	var profile = identity.user; //add all fitbit profile data
	profile["name"] = identity.user.displayName; //add name to see in default login buttons

  // include helpful fields from Fitbit
  var fields = _.pick(identity, Fitbit.whitelistedFields);
  _.extend(serviceData, fields);

  return {
    serviceData: serviceData,
    options: {
    	profile: profile
	}
  };
});


Fitbit.retrieveCredential = function(credentialToken) {
  return Oauth.retrieveCredential(credentialToken);
};