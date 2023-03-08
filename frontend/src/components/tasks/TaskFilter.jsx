import SearchIcon from '@mui/icons-material/Search';
import { Grid, Paper, Stack } from '@mui/material';
import React, { useContext, useState } from 'react';

import { taskTypeOption, taskStatusOption, taskStudentSupportOptions } from '../../constants';
import { FormContext } from '../../contexts/FormContext';
import userRequest from '../../requests/user-request';
import CustomButton from '../form/CustomButton';
import CustomLoadingButton from '../form/CustomLoadingButton';
import CustomSearchSelect from '../form/CustomSearchSelect';
import CustomSelect from '../form/CustomSelect';
import CustomTextField from '../form/CustomTextField';
import CustomDateRangePicker from '../form/CustomDateRangePicker';

const TaskFilter = () => {
    const {
        clearSearch,
        isLoading,
        onChangeHandler,
        onChangeDateRange,
        queryDateRange,
        onChangeSearchSelect,
        queries,
        querySelect,
        submitSearch
    } = useContext(FormContext);
    const [userAssignedBy, setUserAssignedBy] = useState([]);
    const [userAssignedTo, setUserAssignedTo] = useState([]);

    const getUsersAssignedBy = async filter => {
        const users = await userRequest.index(filter);
        const userAssignedBy = users.results.length
            ? users.results.map(option => {
                  return {
                      key: option.id,
                      value: option.name
                  };
              })
            : [];
        setUserAssignedBy(userAssignedBy);
    };
    const getUsersAssignedTo = async filter => {
        const users = await userRequest.index(filter);
        const userAssignedTo = users.results.length
            ? users.results.map(option => {
                  return {
                      key: option.id,
                      value: option.name
                  };
              })
            : [];
        setUserAssignedTo(userAssignedTo);
    };

    return (
        <Paper component="form" sx={{ p: 4, width: '100%' }}>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={3}>
                    <CustomSearchSelect
                        name="user_id_assigned_by"
                        label="Assigned By"
                        availableOptions={userAssignedBy}
                        selectedValue={querySelect.user_id_assigned_by}
                        onChange={onChangeSearchSelect}
                        onTextChange={e => getUsersAssignedBy({ name: e && e.target.value })}
                    />
                </Grid>

                <Grid item xs={3}>
                    <CustomSearchSelect
                        name="user_id_assigned"
                        label="Assigned To"
                        availableOptions={userAssignedTo}
                        selectedValue={querySelect.user_id_assigned}
                        onChange={onChangeSearchSelect}
                        onTextChange={e => getUsersAssignedTo({ name: e && e.target.value })}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomSelect
                        name="status"
                        label="Status"
                        selectedValue={queries.status}
                        options={taskStatusOption}
                        onChange={onChangeHandler}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomSelect
                        name="type"
                        label="Type of Task"
                        selectedValue={queries.type}
                        options={taskTypeOption}
                        onChange={onChangeHandler}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} marginBottom={2}>
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
                        label="Student Name"
                        value={queries.session_student_name}
                        onChange={onChangeHandler}

                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomDateRangePicker
                        name="start_date"
                        startText="Project Start Date"
                        endText="Project End Date"
                        value={[queryDateRange.start_date, queryDateRange.due_date]}
                        onChange={onChangeDateRange}
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

export default TaskFilter;
