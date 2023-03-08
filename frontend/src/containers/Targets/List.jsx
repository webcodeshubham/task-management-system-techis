import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import CustomButton from '../../components/form/CustomButton';
import { FormContext } from '../../contexts/FormContext';
import { useQuery } from '../../hooks/useQuery';
import querystring from 'query-string';
import TargetRequest from '../../requests/target-request';
import TargetFilter from '../../components/targets/TargetFilter';
import TargetTable from '../../components/targets/TargetTable';

const List = () => {
    const history = useHistory();
    const searchQuery = useQuery();
    const [targets, setTargets] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [queries, setQueries] = useState({
        status: searchQuery.get('status') || '',
        note: searchQuery.get('note') || '',
        type: searchQuery.get('type') || '',
        target_number: searchQuery.get('target_number') || '',
        cohort: searchQuery.get('cohort') || '',
        project_due_date: searchQuery.get('project_due_date') || '',
        project_start_date: searchQuery.get('  project_start_date') || '',
        project_name: searchQuery.get('project_name') || '',
        project_github_link: searchQuery.get('project_github_link') || '',
        project_student_name: searchQuery.get('project_student_name') || ''
    });
    const [querySelect, setQuerySelect] = useState({
        user_id: JSON.parse(searchQuery.get('user_id')) || { value: '', keys: '' }
    });
    const [queryDateRange, setQueryDateRange] = useState({
        project_start_date: searchQuery.get('project_start_date') || null,
        project_due_date: searchQuery.get('project_due_date') || null
    });
    const [page, setPage] = useState(+searchQuery.get('page') || 1);

    const handleQueryString = ({ page = 1 }) => {
        const queriesObject = {
            ...queries,
            ...queryDateRange,
            page
        };
        history.replace({
            pathname: 'target',
            search: querystring.stringify(
                {
                    ...queriesObject,
                    user_id: querySelect.user_id.key ? JSON.stringify(querySelect.user_id) : ''
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

    const onChangeDateRange = (project_start_date, project_due_date) => {
        setQueryDateRange({
            ...queryDateRange,
            project_start_date,
            project_due_date
        });
    };

    const submitSearch = () => {
        setIsLoading(true);
        setPage(1);
        const queriesObject = handleQueryString({ page: 1 });
        TargetRequest.index({
            ...queriesObject,
            user_id: querySelect.user_id.key
        }).then(response => {
            setTargets(response);
            setIsLoading(false);
        });
    };

    const clearSearch = () => {
        setIsLoading(true);
        setPage(1);
        TargetRequest.index({ page }).then(response => {
            setTargets(response);
            setIsLoading(false);
        });
        setQueries({
            status: '',
            note: '',
            type: '',
            target_number: '',
            cohort: '',
            project_name: '',
            project_github_link: '',
            project_student_name: ''
        });
        setQuerySelect({ user_id: { value: '', key: '' } });
        setQueryDateRange({ project_start_date: null, project_due_date: null });
        history.replace('/target');
    };

    useEffect(() => {
        let isSubscribed = true;
        TargetRequest.index({
            ...queries,
            ...queryDateRange,
            user_id: querySelect.user_id.key,
            page
        }).then(response => {
            if (isSubscribed) {
                setTargets(response);
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
                <TargetFilter />
            </FormContext.Provider>

            <Grid container direction="row" justifyContent="flex-end" alignItems="center" mt={3}>
                <CustomButton text="Add an Target" variant="contained" onClick={() => history.push('/target/create')} />
            </Grid>
            <TargetTable isLoading={isLoading} targets={targets} page={page} handlePageChange={handlePageChange} />
        </>
    );
};

export default List;
