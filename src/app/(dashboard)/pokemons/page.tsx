import React from 'react';
import { newResource, ResourceCollection } from '@/models/resource';
import { SearchParams } from '@/types/next';
import Index from '@/app/(dashboard)/pokemons/index';
import { getLocale } from '@/locales/dictionary';

const predefinedPeople = [
  { id: 1, name: 'John Doe', benevolent_missions: 5, paid_missions: 3, total_missions: 8, image_url: 'https://via.placeholder.com/70' },
  { id: 2, name: 'Jane Smith', benevolent_missions: 8, paid_missions: 2, total_missions: 10, image_url: 'https://via.placeholder.com/70' },
  { id: 3, name: 'Alice Johnson', benevolent_missions: 7, paid_missions: 5, total_missions: 12, image_url: 'https://via.placeholder.com/70' },
  // Add more people as needed
];

const fetchPeople = async (searchParams: SearchParams) => {
  const locale = getLocale();

  let page = 1;
  if (searchParams?.page) {
    page = parseInt(searchParams.page.toString(), 10);
  }

  let perPage = 20;
  if (searchParams?.per_page) {
    perPage = parseInt(searchParams.per_page.toString(), 10);
  }

  let sort = 'id';
  if (searchParams?.sort) {
    sort = searchParams.sort.toString();
  }

  let order = 'asc';
  if (searchParams?.order && typeof searchParams.order === 'string') {
    order = searchParams.order;
  }

  // Simulate server fetch with predefined data and simple sorting/pagination logic
  const start = (page - 1) * perPage;
  const end = start + perPage;

  const sortedPeople = predefinedPeople.sort((a, b) => {
    if (order === 'asc') {
      return a[sort] > b[sort] ? 1 : -1;
    } else {
      return a[sort] < b[sort] ? 1 : -1;
    }
  });

  const paginatedPeople = sortedPeople.slice(start, end);
  const total = predefinedPeople.length;

  const personResource: ResourceCollection<any> = newResource(paginatedPeople, total, page, perPage);

  return {
    personResource,
    page,
    perPage,
    sort,
    order,
  };
};

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const props = await fetchPeople(searchParams);

  return (
    <Index props={props} />
  );
}
