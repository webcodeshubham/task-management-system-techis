import SearchIcon from '@mui/icons-material/Search';
import { Grid, Paper, Stack } from '@mui/material';
import React, { useContext, useState } from 'react';

import { targetTypeOption, targetStatusOption } from '../../constants';
import { FormContext } from '../../contexts/FormContext';
import userRequest from '../../requests/user-request';
import CustomButton from '../form/CustomButton';
import CustomLoadingButton from '../form/CustomLoadingButton';
import CustomSearchSelect from '../form/CustomSearchSelect';
import CustomSelect from '../form/CustomSelect';
import CustomTextField from '../form/CustomTextField';
import CustomDateRangePicker from '../form/CustomDateRangePicker'

const TargetFilter = () => {
    const {
        clearSearch,
        isLoading,
        onChangeHandler,
        onChangeSearchSelect,
        onChangeDateRange,
        queries,
        querySelect,
        queryDateRange,
        submitSearch
    } = useContext(FormContext);
    const [userOptions, setUserOptions] = useState([]);

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

    return (
        <Paper component="form" sx={{ p: 4, width: '100%' }}>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={3}>
                    <CustomSearchSelect
                        name="user_id"
                        label="Tutor Name"
                        availableOptions={userOptions}
                        selectedValue={querySelect.user_id}
                        onChange={onChangeSearchSelect}
                        onTextChange={e => getUsers({ search: e && e.target.value })}
                    />
                </Grid>

                <Grid item xs={3}>
                    <CustomSelect
                        name="status"
                        label="Status"
                        selectedValue={queries.status}
                        options={targetStatusOption}
                        onChange={onChangeHandler}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomSelect
                        name="type"
                        label="Type of Target"
                        selectedValue={queries.type}
                        options={targetTypeOption}
                        onChange={onChangeHandler}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomTextField
                        name="target_number"
                        label=" Target Count"
                        value={queries.target_number}
                        onChange={onChangeHandler}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={3}>
                    <CustomTextField name="cohort" label=" Cohort" value={queries.cohort} onChange={onChangeHandler} />
                </Grid>
                
                <Grid item xs={3}>
                    <CustomTextField
                        name="project_name"
                        label="Project Name"
                        value= {queries.project_name}
                        onChang={onChangeHandler}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomDateRangePicker
                        name="project_start_date"
                        startText="Project Start Date"
                        endText="Project End Date"
                        value={[queryDateRange.project_start_date, queryDateRange.project_due_date]}
                        onChange={onChangeDateRange}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomTextField
                        name="project_name"
                        label="Project Name"
                        value={queries.project_name}
                        onChang={onChangeHandler}
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

export default TargetFilter;
