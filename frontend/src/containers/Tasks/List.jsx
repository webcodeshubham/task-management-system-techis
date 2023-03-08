import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import TaskFilter from '../../components/tasks/TaskFilter';
import TaskTable from '../../components/tasks/TaskTable';
import CustomButton from '../../components/form/CustomButton';
import { FormContext } from '../../contexts/FormContext';
import TaskRequest from '../../requests/task-request';
import { useQuery } from '../../hooks/useQuery';
import querystring from 'query-string';

const List = () => {
    const history = useHistory();
    const searchQuery = useQuery();
    const [tasks, setTasks] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [queries, setQueries] = useState({
        status: searchQuery.get('status') || '',
        name: searchQuery.get('name') || '',
        type: searchQuery.get('type') || '',
        duration: searchQuery.get('duration') || '',
        note: searchQuery.get('note') || '',
        student_support_type: searchQuery.get('student_support_type') || '',
        session_topic: searchQuery.get('  session_topic') || '',
        session_feedback: searchQuery.get('session_feedback') || '',
        session_student_name: searchQuery.get('session_student_name') || '',
        session_video_link: searchQuery.get('session_video_link') || '',

    });
    const [querySelect, setQuerySelect] = useState({
        user_id_assigned_by: JSON.parse(searchQuery.get('user_id_assigned_by')) || { value: '', keys: '' },
        user_id_assigned: JSON.parse(searchQuery.get(' user_id_assigned')) || { value: '', keys: '' }
    });
    const [queryDateRange, setQueryDateRange] = useState({
        start_date: searchQuery.get('start_date') || null,
        due_date: searchQuery.get('due_date') || null
    });
    const [page, setPage] = useState(+searchQuery.get('page') || 1);

    const handleQueryString = ({ page = 1 }) => {
        const queriesObject = {
            ...queries,
            ...queryDateRange,
            page
        };
        history.replace({
            pathname: 'task',
            search: querystring.stringify(
                {
                    ...queriesObject,
                    user_id_assigned_by: querySelect.user_id_assigned_by.key ? JSON.stringify(querySelect.user_id_assigned_by) : '',
                    user_id_assigned: querySelect.user_id_assigned.key ? JSON.stringify(querySelect.user_id_assigned) : ''
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
        const { value, name } = e.target;

        setQueries({
            ...queries,
            [name]: value
        });
    };

    const onChangeSearchSelect = (value, name) => {
        setQuerySelect({
            ...querySelect,
            [name]: value
        });
    };

    const onChangeDateRange = (start_date, due_date) => {
        setQueryDateRange({
            ...queryDateRange,
            start_date,
            due_date
        });
    };

    const submitSearch = () => {
        setIsLoading(true);
        setPage(1);
        const queriesObject = handleQueryString({ page: 1 });
        TaskRequest.index({
            ...queriesObject,
            user_id_assigned_by: querySelect.user_id_assigned_by.key,
            user_id_assigned: querySelect.user_id_assigned.key
        }).then(response => {
            setTasks(response);
            setIsLoading(false);
        });
    };

    const clearSearch = () => {
        setIsLoading(true);
        setPage(1);
        TaskRequest.index({ page }).then(response => {
            setTasks(response);
            setIsLoading(false);
        });
        setQueries({
            status: '',
            name: '',
            type: '',
            duration: '',
            note: '',
            student_support_type: '',
            session_topic: '',
            session_feedback: '',
            session_student_name: '',
            session_video_link: '',
        });
        setQuerySelect({ user_id_assigned_by: { value: '', key: '' }, user_id_assigned: { value: '', key: '' } });
        setQueryDateRange({ start_date: null, due_date: null });
        history.replace('/task');
    };

    useEffect(() => {
        let isSubscribed = true;
        TaskRequest.index({
            ...queries,
            ...queryDateRange,
            user_id_assigned: querySelect.user_id_assigned.key,
            user_id_assigned_by: querySelect.user_id_assigned_by.key,
            page
        }).then(response => {
            if (isSubscribed) {
                setTasks(response);
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
                <TaskFilter />
            </FormContext.Provider>

            <Grid container direction="row" justifyContent="flex-end" alignItems="center" mt={3}>
                <CustomButton
                    text="Add an Task"
                    variant="contained"
                    onClick={() => history.push('/task/create')}
                />
            </Grid>
            <TaskTable
                 isLoading={isLoading}
                 tasks={tasks}
                 page={page}
                 handlePageChange={handlePageChange}
            />
        </>
    );
};

export default List;
