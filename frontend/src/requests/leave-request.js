import BaseRequest from "./base-request"

class LeaveRequest extends BaseRequest{
    checkCommunication(leaveId) {
        return this.performRequest(BaseRequest.METHOD_GET, `check_communication/${leaveId}/`);
    }
}
export default new LeaveRequest('leaves');