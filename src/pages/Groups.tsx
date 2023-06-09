import {FC, useState} from 'react'
import { axiosRequest, getGroups } from '../utils/functions';
import { GroupUrl } from '../utils/network';
import { useEffect } from 'react';
import ContentLayout from '../components/ContentLayout';
import { DataProps, GroupProps } from '../utils/types';
import AddGroupForm from '../components/AddGroupForm';
import { useGetGroups } from '../utils/hooks';

const Groups:FC = () => {

    const [modalState, setModalState] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [groups, setGroups] = useState<GroupProps[]>([])

    useGetGroups(setGroups, setFetching)
      
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Nom',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Appartient à (un autre groupe)',
        dataIndex: 'belongsTo',
        key: 'belongsTo',
      },
      {
        title: 'Créé à',
        dataIndex: 'created_at',
        key: 'created_at',
      },
      {
        title: 'Articles au total',
        dataIndex: 'total_items',
        key: 'total_items',
      },
      {
        title: 'Actions',
        dataIndex: 'action',
        key: 'action',
      },
    ];

    const onCreateGroup = () => {
      setModalState(false)
      setFetching(true)
      getGroups(setGroups, setFetching)
    }

    return (
      <ContentLayout
        pageTitle="Groupe"
        setModalState={setModalState}
        dataSource={(groups as unknown) as DataProps[]}
        columns={columns}
        fetching={fetching}
      >
        <AddGroupForm 
          onSuccessCallBack={onCreateGroup} 
          isVisible={modalState}
          onClose={() => setModalState(false)}
          groups={groups}
        />
      </ContentLayout>
    )
}


export default Groups