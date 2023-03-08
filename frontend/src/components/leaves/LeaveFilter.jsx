import SearchIcon from '@mui/icons-material/Search';
import { Grid, Paper, Stack } from '@mui/material';
import React, { useContext, useState } from 'react';

import { leaveType, leaveStatus, leaveAppliedTo } from '../../constants';
import { FormContext } from '../../contexts/FormContext';
import userRequest from '../../requests/user-request';
import CustomButton from '../form/CustomButton';
import CustomLoadingButton from '../form/CustomLoadingButton';
import CustomSearchSelect from '../form/CustomSearchSelect';
import CustomSelect from '../form/CustomSelect';
import CustomTextField from '../form/CustomTextField';
import CustomDateRangePicker from '../form/CustomDateRangePicker';

const LeaveFilter = () => {
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
    const [userLeaveAppliedBy, setUserLeaveAppliedBy] = useState([]);
    const [userLeaveAppliedTo, setUserLeaveAppliedTo] = useState([]);

    const getUsersAppliedBy = async filter => {
        const users = await userRequest.index(filter);
        const userLeaveAppliedBy = users.results.length
            ? users.results.map(option => {
                  return {
                      key: option.id,
                      value: option.name
                  };
              })
            : [];
            setUserLeaveAppliedBy(userLeaveAppliedBy);
    };
    const getUsersAppliedTo = async filter => {
        const users = await userRequest.index(filter);
        const userLeaveAppliedTo = users.results.length
            ? users.results.map(option => {
                  return {
                      key: option.id,
                      value: option.name
                  };
              })
            : [];
            setUserLeaveAppliedTo(userLeaveAppliedTo);
    };

    return (
        <Paper component="form" sx={{ p: 4, width: '100%' }}>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={3}>
                    <CustomSearchSelect
                        name="leave_applied_by"
                        label="Applied By"
                        availableOptions={userLeaveAppliedBy}
                        selectedValue={querySelect.leave_applicant_id}
                        onChange={onChangeSearchSelect}
                        onTextChange={e => getUsersAppliedTo({ name: e && e.target.value })}
                    />
                </Grid>

                <Grid item xs={3}>
                    <CustomSearchSelect
                        name="leave_applicant_id"
                        label="Applied To"
                        availableOptions={leaveAppliedTo}
                        selectedValue={querySelect.leave_applicant_id}
                        onChange={onChangeSearchSelect}
                        onTextChange={e => getUsersAppliedTo({ name: e && e.target.value })}
                    />
                </Grid>
                
            </Grid>
            <Grid container spacing={2} marginBottom={2}>
            
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
                        name="from_date"
                        startText="Leave Start Date"
                        endText="Leave End Date"
                        value={[queryDateRange.from_date, queryDateRange.to_date]}
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

export default LeaveFilter;
