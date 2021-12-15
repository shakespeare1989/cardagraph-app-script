function getSelf() {
  var people = People.People.getBatchGet({
    resourceNames: ['people/me'],
    personFields: 'names,emailAddresses'
  });
  Logger.log('Myself: %s', JSON.stringify(people, null, 2));
}
