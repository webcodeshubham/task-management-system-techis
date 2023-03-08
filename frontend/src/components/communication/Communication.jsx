import { Grid, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import CustomSearchSelect from '../../components/form/CustomSearchSelect';
import userRequest from '../../requests/user-request';
import communicationsRequest from '../../requests/communications-request';

const Communication = () => {
    const history = useHistory();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(!!id);
    const [userOptions, setUserOptions] = useState([]);

    const [communication, setCommunication] = useState({
        reviewed_by: { key: '', value: '' },
        critical_total: '',
        general_total: '',
        error_total: '',
        
    });

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (id) {
            communicationsRequest.find(id).then(res => {
                setCommunication({
                    ...res,
                    user_id_assigned_by: res.user_id_assigned_by
                        ? { key: res.user_id_assigned_by.id, value: res.user_id_assigned_by.name }
                        : null,
                });

                setIsLoading(false);
                let userOpt = res.user
                    ? [
                          {
                              key: res.user.id,
                              value: res.user.name
                          }
                      ]

                    : [];
                setUserOptions(userOpt);

            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnchange = e => {
        const { name, value } = e.target;
        setCommunication(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onChangeSearchSelect = (value, name) => {
        setCommunication(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const getUsers = async filter => {
        userRequest.index(filter).then(res => {
            let newOptions = res.results.length
                ? res.results.map(option => {
                      return {
                          key: option.id,
                          value: option.name
                      };
                  })
                : [];
            setUserOptions(newOptions);
        });
    };
    const onChangeDate = (value, name) => {
        setCommunication(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmit = () => {
        setIsLoading(true);
        if (id) {
            communicationsRequest
                .update(id, {
                    ...communication,
                    reviewed_by: communication.reviewed_by.key,
                })
                .then(() => history.goBack())
                .catch(err => {
                    setErrors(err.response.data);
                    setIsLoading(false);
                });
        } else {
            communication
                .store({
                    ...communication,
                    reviewed_by: communication.reviewed_by.key,

                })
                .then(() => history.goBack())
                .catch(err => {
                    setErrors(err.response.data);
                    setIsLoading(false);
                });
        }
    };

    return (
        <>
            
            <Grid container spacing={2} marginBottom={2} marginTop={2} marginLeft={1}>
                <Grid item xs={4}>
                    <CustomSearchSelect
                        label="reviewed_by"
                        name="reviewed_by"
                        error={!!errors.reviewed_by}
                        helperText={errors.reviewed_by}
                        availableOptions={userOptions}
                        selectedValue={communication.reviewed_by}
                        onChange={onChangeSearchSelect}
                        onTextChange={e => getUsers({ name: e && e.target.value })}
                    />
                </Grid>

            </Grid>
            {/* <Stack spacing={2} direction="row">
                <CustomLoadingButton
                    onClick={onSubmit}
                    loading={isLoading}
                    variant="contained"
                    text={id ? 'Update' : 'Add'}
                ></CustomLoadingButton>
                <CustomButton text="Cancel" variant="outlined" onClick={() => history.goBack()} />
            </Stack> */}
        </>
    );
};

export default Communication;
