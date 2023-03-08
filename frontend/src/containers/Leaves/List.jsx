import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import CustomButton from '../../components/form/CustomButton';
import { FormContext } from '../../contexts/FormContext';
import LeaveRequest from '../../requests/leave-request';
import { useQuery } from '../../hooks/useQuery';
import querystring from 'query-string';
import LeaveFilter from '../../components/leaves/LeaveFilter';
import LeaveTable from '../../components/leaves/LeaveTable';

const List = () => {
    const history = useHistory();
    const searchQuery = useQuery();
    const [leaves, setLeaves] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [queries, setQueries] = useState({
        leave_status: searchQuery.get('leave_status') || '',
        user_name: searchQuery.get('user_name') || '',
        leave_type: searchQuery.get('leave_type') || '',
        duration: searchQuery.get('duration') || '',
        description: searchQuery.get('description') || '',
        leave_balance: searchQuery.get('leave_balance') || ''
    });
    const [querySelect, setQuerySelect] = useState({
        leave_applied_by: JSON.parse(searchQuery.get('user_id_assigned_by')) || { value: '', keys: '' },
        leave_applicant_id: JSON.parse(searchQuery.get(' user_id_assigned')) || { value: '', keys: '' }
    });
    const [queryDateRange, setQueryDateRange] = useState({
        from_date: searchQuery.get('from_date') || null,
        to_date: searchQuery.get('to_date') || null
    });
    const [page, setPage] = useState(+searchQuery.get('page') || 1);

    const handleQueryString = ({ page = 1 }) => {
        const queriesObject = {
            ...queries,
            ...queryDateRange,
            page
        };
        history.replace({
            pathname: 'leave',
            search: querystring.stringify(
                {
                    ...queriesObject,
                    leave_applied_by: querySelect.leave_applied_by.key
                        ? JSON.stringify(querySelect.leave_applied_by)
                        : '',
                    leave_applicant_id: querySelect.leave_applicant_id.key
                        ? JSON.stringify(querySelect.leave_applicant_id)
                        : ''
                },
                { skipEmptyString: true, skipNull: true }
            )
        });

        return queriesObject;
    };

    const handlePageChange = (e, value) => {
        handleQueryString({ page: value });
        setPage(value);
    };

    const onChangeHandler = e => {
        const { value, user_name } = e.target;

        setQueries({
            ...queries,
            [user_name]: value
        });
    };

    const onChangeSearchSelect = (value, user_name) => {
        setQuerySelect({
            ...querySelect,
            [user_name]: value
        });
    };

    const onChangeDateRange = (from_date, to_date) => {
        setQueryDateRange({
            ...queryDateRange,
            from_date,
            to_date
        });
    };

    const submitSearch = () => {
        setIsLoading(true);
        setPage(1);
        const queriesObject = handleQueryString({ page: 1 });
        LeaveRequest.index({
            ...queriesObject,
            leave_applied_by: querySelect.leave_applied_by.key,
            leave_applicant_id: querySelect.leave_applicant_id.key
        }).then(response => {
            setLeaves(response);
            setIsLoading(false);
        });
    };

    const clearSearch = () => {
        setIsLoading(true);
        setPage(1);
        LeaveRequest.index({ page }).then(response => {
            setLeaves(response);
            setIsLoading(false);
        });
        setQueries({
            leave_status: '',
            user_name: '',
            leave_type: '',
            duration: '',
            description: '',
            leave_balance: ''
        });

        setQuerySelect({ leave_applied_by: { value: '', key: '' }, leave_applicant_id: { value: '', key: '' } });
        setQueryDateRange({ from_date: null, to_date: null });
        history.replace('/task');
    };

    useEffect(() => {
        let isSubscribed = true;
        LeaveRequest.index({
            ...queries,
            ...queryDateRange,
            leave_applicant_id: querySelect.leave_applicant_id.key,
            leave_applied_by: querySelect.leave_applied_by.key,
            page
        }).then(response => {
            if (isSubscribed) {
                setLeaves(response);
                setIsLoading(false);
            }
        });

        return () => (isSubscribed = false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    return (
        <>
            <FormContext.Provider
                value={{
                    clearSearch,
                    isLoading,
                    onChangeDateRange,
                    onChangeHandler,
                    onChangeSearchSelect,
                    queries,
                    queryDateRange,
                    querySelect,
                    submitSearch
                }}
            >
                <LeaveFilter />
            </FormContext.Provider>

            <Grid container direction="row" justifyContent="flex-end" alignItems="center" mt={3}>
                <CustomButton
                    text="Appply for Leave"
                    variant="contained"
                    onClick={() => history.push('/leave/create')}
                />
            </Grid>
            <LeaveTable isLoading={isLoading} leaves={leaves} page={page} handlePageChange={handlePageChange} />
        </>
    );
};

export default List;
