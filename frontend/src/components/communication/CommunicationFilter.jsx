import SearchIcon from '@mui/icons-material/Search';
import { Grid, Paper, Stack } from '@mui/material';
import React, { useContext, useState } from 'react';

import { taskTypeOption, taskStudentSupportOptions } from '../../constants';
import { FormContext } from '../../contexts/FormContext';
import userRequest from '../../requests/user-request';
import CustomButton from '../form/CustomButton';
import CustomLoadingButton from '../form/CustomLoadingButton';
import CustomSearchSelect from '../form/CustomSearchSelect';
import CustomSelect from '../form/CustomSelect';
import CustomTextField from '../form/CustomTextField';

const CommunicationFilter = () => {
    const {
        clearSearch,
        isLoading,
        onChangeHandler,
        onChangeSearchSelect,
        queries,
        querySelect,
        submitSearch
    } = useContext(FormContext);
    const [userOptions, setUserOptions] = useState([]);
    const [reviewOptions, setReviewOptions] = useState([]);

    const getUsers = async filter => {
        const users = await userRequest.index(filter);
        const userOptions = users.results.length
            ? users.results.map(option => {
                  return {
                      key: option.id,
                      value: option.name
                  };
              })
            : [];
        setUserOptions(userOptions);
    };
    const getReviewBy = async filter => {
        const review = await userRequest.index(filter);
        const reviewOptions = review.results.length
            ? review.results.map(option => {
                  return {
                      key: option.id,
                      value: option.name
                  };
              })
            : [];
          setReviewOptions(reviewOptions)
    };

    return (
        <Paper component="form" sx={{ p: 4, width: '100%' }}>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={3}>
                    <CustomSearchSelect
                        name="user_id"
                        label="Engineer Name"
                        availableOptions={userOptions}
                        selectedValue={querySelect.user_id}
                        onChange={onChangeSearchSelect}
                        onTextChange={e => getUsers({ name: e && e.target.value })}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomSelect
                        name="task_type"
                        label="Type of Task"
                        selectedValue={queries.task_type}
                        options={taskTypeOption}
                        onChange={onChangeHandler}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomSelect
                        name="student_support_type"
                        label="Student Support Type"
                        selectedValue={queries.student_support_type}
                        options={taskStudentSupportOptions}
                        onChange={onChangeHandler}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomTextField
                        name="session_student_name"
                        label=" Student Name"
                        value={queries.session_student_name}
                        onChange={onChangeHandler}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={3}>
                    <CustomSearchSelect
                        name="review_by"
                        label="Reviewed By"
                        availableOptions={reviewOptions}
                        selectedValue={querySelect.review_by}
                        onChange={onChangeSearchSelect}
                        onTextChange={e => getReviewBy({ search: e && e.target.value })}
                    />
                </Grid>
            </Grid>
            <Grid container sx={{ mt: 2 }}>
                <Stack spacing={2} direction="row">
                    <CustomLoadingButton
                        onClick={submitSearch}
                        loading={isLoading}
                        startIcon={<SearchIcon />}
                        variant="contained"
                        text="Search"
                    ></CustomLoadingButton>
                    <CustomButton onClick={clearSearch} text="Clear" variant="outlined" />
                </Stack>
            </Grid>
        </Paper>
    );
};

export default CommunicationFilter;
