import BaseRequest from "./base-request"

class TaskRequest extends BaseRequest{
    checkCommunication(taskId) {
        return this.performRequest(BaseRequest.METHOD_GET, `check_communication/${taskId}/`);
    }
}
export default new TaskRequest('tasks');