import { Box, CircularProgress, Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { leaveType, leaveStatus, leaveAppliedTo } from '../../constants';
import { getUser } from '../../reducks/users/selectors';
import leaveRequest from '../../requests/leave-request';
import { getDateFormat, getStatusColor, getValueOption } from '../../utils/common';
import { StyledTableCell, StyledTableRow } from '../common/StyledTable';
import CustomButton from '../form/CustomButton';
import CustomPagination from '../form/CustomPagination';

export default function LeaveTable(props) {
    const { leaves, page, handlePageChange, isLoading } = props;
    const totalPage = leaves ? leaves.total_pages : 0;
    const perPage = leaves ? leaves.per_page : 0;
    const count = leaves ? leaves.count : 0;
    const hasleaves = leaves && leaves.results && !!leaves.results.length;
    const history = useHistory();
    const selector = useSelector(state => state);
    const user = getUser(selector);

    return (
        <>
            {isLoading ? (
                <Box sx={{ display: 'flex', margin: '18px', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : hasleaves ? (
                <TableContainer sx={{ mt: 3 }} component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">No.</StyledTableCell>
                                <StyledTableCell align="center">Employee ID</StyledTableCell>
                                <StyledTableCell align="center">Employee Name</StyledTableCell>
                                <StyledTableCell align="center">Month</StyledTableCell>
                                <StyledTableCell align="center">Leave Type</StyledTableCell>
                                <StyledTableCell align="center">Total Days</StyledTableCell>
                                <StyledTableCell align="center">Leave Bal</StyledTableCell>
                                <StyledTableCell align="center">From Date</StyledTableCell>
                                <StyledTableCell align="center">To Date</StyledTableCell>
                                <StyledTableCell align="center">Description</StyledTableCell>
                                <StyledTableCell align="center">Status</StyledTableCell>
                                {/* <StyledTableCell align="center">Score</StyledTableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {leaves.results.map((leave, index) => (
                                <StyledTableRow key={leave.id}>
                                    <StyledTableCell align="center" component="th" scope="row">
                                        {perPage * (page - 1) + (1 + index)}
                                    </StyledTableCell>
                                    {/* <StyledTableCell align="center">{leave.leave_applied_by.name}</StyledTableCell>
                                    <StyledTableCell align="center">{leave.leave_applicant_id.name}</StyledTableCell>
                                    <StyledTableCell align="center">{leave.batches}</StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        style={{ color: getStatusColor(leavestatusColorOptions, leave.status) }}
                                    >
                                        {getValueOption(leavestatusOption, leave.status)}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {getValueOption(leaveTypeOption, leave.type)}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {getValueOption(
                                            leave.type == 'internal_support'
                                                ? leaveInternalSupportOptions
                                                : leavestudentSupportOptions,
                                            leave.student_support_type
                                        )}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{leave.session_student_name}</StyledTableCell>
                                    <StyledTableCell align="center">{leave.duration}</StyledTableCell>
                                    <StyledTableCell align="center">{leave.session_topic}</StyledTableCell>
                                    <StyledTableCell align="center">{leave.session_feedback}</StyledTableCell>
                                    <StyledTableCell align="center">{leave.start_date}</StyledTableCell>
                                    <StyledTableCell align="center">{leave.session_video_link}</StyledTableCell> */}

                                    <StyledTableCell align="center">{getDateFormat(leave.created_at)}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        {leave.updated_by && leave.updated_by.name}
                                    </StyledTableCell>

                                    <Stack direction="row" spacing={1}>
                                        <StyledTableCell align="center">
                                            <CustomButton
                                                onClick={() =>
                                                    history.push(`/leave/edit/${leave.id}`, {
                                                        id: leave.id
                                                    })
                                                }
                                                text="Edit"
                                                variant="outlined"
                                            />
                                        </StyledTableCell>
                                    </Stack>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <CustomPagination
                        page={page}
                        handlePageChange={handlePageChange}
                        totalPage={totalPage}
                        count={count}
                        perPage={perPage}
                    />
                </TableContainer>
            ) : (
                <h3>NO DATA</h3>
            )}
        </>
    );
}
