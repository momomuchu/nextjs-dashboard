import {
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Table,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import THSort from '@/components/TableSort/THSort';
import useDictionary from '@/locales/dictionary-hook';
import { generatePeople } from './data';

type Props = {
  people: any[];
}


export default function PersonList(props: Props) {
  const { people } = props;
  const dict = useDictionary();
  console.log(dict)
  const predefinedPeople = generatePeople();

  return (
    <Table responsive bordered hover>
      <thead>
        <tr className="table-light dark:table-dark">
          <th><THSort name="id">#</THSort></th>
          <th aria-label="Photo" />
          <th><THSort name="name">Nom</THSort></th>
          <th className="text-end"><THSort name="benevolent_missions">Benevolent Missions</THSort></th>
          <th className="text-end"><THSort name="paid_missions">Benevolent Missions</THSort></th>
          <th className="text-end"><THSort name="total_missions">Total Missions</THSort></th>
          <th aria-label="Action" />
        </tr>
      </thead>
      <tbody>
        {predefinedPeople.map((person) => (
          <tr key={person.id}>
            <td>{person.id}</td>
            <td>
              <div className="position-relative mx-auto" style={{ width: '70px', height: '70px' }}>
                <Image
                  fill
                  style={{ objectFit: 'contain' }}
                  alt={person.identifier}
                  sizes="5vw"
                  src={person.image_url}
                />
              </div>
            </td>
            <td>{person.name}</td>
            <td className="text-end">{person.benevolent_missions}</td>
            <td className="text-end">{person.paid_missions}</td>
            <td className="text-end">{person.total_missions}</td>
            <td>
              <Dropdown align="end">
                <DropdownToggle
                  as="button"
                  bsPrefix="btn"
                  className="btn-link rounded-0 text-black-50 dark:text-gray-500 shadow-none p-0"
                  id={`action-${person.id}`}
                >
                  <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                </DropdownToggle>

                <DropdownMenu>
                  <DropdownItem href="#/action-1">{dict.action.info}</DropdownItem>
                  <Link href={`people/${person.id}/edit`} passHref legacyBehavior>
                    <DropdownItem>{dict.action.edit}</DropdownItem>
                  </Link>
                  <DropdownItem
                    className="text-danger"
                    href="#/action-3"
                  >
                    {dict.action.delete}
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
