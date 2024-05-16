import { faker } from '@faker-js/faker';

export const generatePeople = (count = 20) => {
    const people = [];
    for (let i = 0; i < count; i++) {
      const isAssociation = faker.datatype.boolean();
      const person = {
        id: i + 1,
        name: faker.name.fullName(),
        benevolent_missions: faker.datatype.number({ min: 1, max: 10 }),
        paid_missions: faker.datatype.number({ min: 1, max: 10 }),
        total_missions: 0, // Will be calculated below
        image_url: isAssociation ? faker.image.business() : faker.image.avatar(),
        association: isAssociation ? faker.company.name()  : null,
      };
      person.total_missions = person.benevolent_missions + person.paid_missions;
      people.push(person);
    }
    return people;
  };

