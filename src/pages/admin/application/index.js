import Layout from '@/components/layout/Layout'
import RecentApplications from '@/components/manager/RecentApplications'
import { getUsers, selectUsers } from '@/redux/slices/managerSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function Application() {

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const dispatch = useDispatch();
    const users = useSelector(selectUsers);

    useEffect(() => {
        dispatch(getUsers({ page, limit }));
    }, [page, limit]);


    return (
        <>
            <Layout>
                <div className='p-10'>
                    <RecentApplications data={users?.data?.data} />
                </div>
            </Layout>
        </>
    )
}

export default Application