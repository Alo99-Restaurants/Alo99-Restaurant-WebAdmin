'use client';

import Header from '@/components/Header';
import { useAuth } from '@/context/AuthContext';
import { useNotification } from '@/context/NotificationContext';
import { useLocalStorage } from '@/hook/useLocalStorage';
import { getRestaurantService } from '@/services/restaurant.service';
import useStoreBranchesStore from '@/store/storeBranches';
import { Layout, theme } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

const { Content, Footer } = Layout;

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const { userData } = useAuth();
  const { addNotification } = useNotification();
  const { setStoreBranchesStore, setStoreBranchActive } = useStoreBranchesStore(
    useShallow((state) => ({
      setStoreBranchesStore: state.setStoreBranches,
      setStoreBranchActive: state.setStoreBranchActive
    }))
  );

  const [storeBranchActiveLocalStorage, setStoreBranchActiveLocalStorage] =
    useLocalStorage('storeBranchActive');
  const storeBranchActiveId = typeof window !== 'undefined' && JSON.parse(storeBranchActiveLocalStorage).id;

  const [storeBranches, setStoreBranches] = useState();

  useEffect(() => {
    const fetchDataRestaurantStore = async () => {
      try {
        const response = await getRestaurantService();
        const setStoreBranchesResponse = response?.data?.items;
        const storeBranchActive = setStoreBranchesResponse.find(
          (branch) => branch.id === storeBranchActiveId
        );
        setStoreBranches(setStoreBranchesResponse);
        //Zustand
        setStoreBranchesStore(setStoreBranchesResponse);
        setStoreBranchActive(storeBranchActive);
        // Save to local storage if don't have storeBranchActiveLocalStorage
        if (!storeBranchActiveLocalStorage.length) {
          setStoreBranchActiveLocalStorage(
            JSON.stringify(setStoreBranchesResponse[0])
          );
          setStoreBranchActive(setStoreBranchesResponse[0]);
        }
      } catch (error) {
        addNotification(error, 'error');
      }
    };
    fetchDataRestaurantStore();
  }, []);

  useEffect(() => {
    if (!userData.userInfo || !userData.token) {
      router.replace('/sign-in');
    }
  }, [userData]);

  const {
    token: { colorBgContainer }
  } = theme.useToken();

  return (
    <Layout className='layout bg-blue-50 backdrop-blur-md'>
      <Header storeBranches={storeBranches} />

      <Content className='px-[20px] my-2'>
        <div
          className='site-layout-content rounded-xl mt-3 h-[calc(100vh-(69px+64px+12px+16px))] p-5  shadow'
          style={{ background: colorBgContainer }}>
          {children}
        </div>
      </Content>

      <Footer className='text-center bg-blue-50'>
        Alo99 ©2023 Created by KP
      </Footer>
    </Layout>
  );
};
export default AdminLayout;
