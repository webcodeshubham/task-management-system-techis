import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { FormContext } from '../../contexts/FormContext';
import { useQuery } from '../../hooks/useQuery';
import querystring from 'query-string';
import CommunicationFilter from '../../components/communication/CommunicationFilter';
import communicationRequest from '../../requests/communications-request';
import CommunicationTable from '../../components/communication/CommunicationTable';

const List = () => {
    const history = useHistory();
    const searchQuery = useQuery();
    const [communications, setCommunications] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [queries, setQueries] = useState({
        session_student_name: searchQuery.get('session_student_name') || '',
        type: searchQuery.get('type') || '',
        student_support_type: searchQuery.get('student_support_type') || '',
    });
    const [querySelect, setQuerySelect] = useState({
        user_id: JSON.parse(searchQuery.get('user_id')) || { value: '', keys: '' },
        review_by: JSON.parse(searchQuery.get('review_by')) || {value: '', keys:''}

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
            pathname: 'communication',
            search: querystring.stringify(
                {
                    ...queriesObject,
                    user_id: querySelect.user_id.key ? JSON.stringify(querySelect.user_id) : '',
                    review_by: querySelect.review_by.key ? JSON.stringify(querySelect.review_by): ''
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
        communicationRequest
            .index({
                ...queriesObject,
                user_id: querySelect.user_id.key,
                review_by: querySelect.review_by.key
            })
            .then(response => {
                setCommunications(response);
                setIsLoading(false);
            });
    };
    const clearSearch = () => {
        setIsLoading(true);
        setPage(1);
        communicationRequest.index({ page }).then(response => {
            setCommunications(response);
            setIsLoading(false);
        });
        setQueries({
            review_by: '',
            student_support_type: '',
            session_student_name: ''
        });
        setQuerySelect({ user_id: { value: '', key: '' }, review_by:{value: '', key: ''} });


        setQueryDateRange({ project_start_date: null, project_due_date: null });
        history.replace('/communication');
    };

    useEffect(() => {
        communicationRequest
            .index({
                ...queries,
                ...queryDateRange,
                user_id: querySelect.user_id.key,
                review_by: querySelect.review_by.key,
                page
            })
            .then(response => {
                setCommunications(response);
                setIsLoading(false);
            });

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
                <CommunicationFilter />
            </FormContext.Provider>

            <CommunicationTable
                isLoading={isLoading}
                communications={communications}
                page={page}
                handlePageChange={handlePageChange}
            />
        </>
    );
};

export default List;
