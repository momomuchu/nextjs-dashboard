'use client'

import { Button, Card } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { ResourceCollection, newResource } from '@/models/resource';
import Pagination from '@/components/Pagination/Pagination';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PersonList from '@/components/Page/Pokemon/PokemonList';
import useDictionary from '@/locales/dictionary-hook';

const predefinedPeople = [
  { id: 1, name: 'John Doe', benevolent_missions: 5, paid_missions: 3, total_missions: 8, image_url: 'https://via.placeholder.com/70' },
  { id: 2, name: 'Jane Smith', benevolent_missions: 8, paid_missions: 2, total_missions: 10, image_url: 'https://via.placeholder.com/70' },
  { id: 3, name: 'Alice Johnson', benevolent_missions: 7, paid_missions: 5, total_missions: 12, image_url: 'https://via.placeholder.com/70' },
  // Add more people as needed
];

type Props = {
  props: {
    personResource: ResourceCollection<Person>;
    page: number;
    perPage: number;
    sort: string;
    order: string;
  };
}

export default function Index(props: Props) {
  const {
    props: {
      personResource: personResourceFallback,
      page,
      perPage,
      sort,
      order,
    },
  } = props;

  const [personResource, setPersonResource] = useState<ResourceCollection<Person>>(personResourceFallback);
  const router = useRouter();
  const dict = useDictionary();

  useEffect(() => {
    // Simulate fetching data from an API
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedPeople = predefinedPeople.slice(start, end);
    const total = predefinedPeople.length;
    setPersonResource(newResource(paginatedPeople, total, page, perPage));
  }, [page, perPage, sort, order]);

  return (
    <Card>
      <Card.Header>{dict?.people?.title ?? 'People List'}</Card.Header>
      <Card.Body>
        <Pagination meta={personResource.meta} />
        <PersonList people={personResource.data} />
        <Pagination meta={personResource.meta} />
      </Card.Body>
    </Card>
  );
}
