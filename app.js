const express = require('express');
const app = express();
const port = 4000;
const body_parser = require('body-parser');
const path = require('path');
const cors = require('cors');

const zoneRouter = require('./Router/zone_router');
const wardRouter = require('./Router/ward_router');
const streetRouter = require('./Router/street_router');
const complaintRouter = require('./Router/complaint_router');
const grievanceStatusRouter = require('./Router/grievance_status_router');
const userRouter = require('./Router/user_router');
const publicUserRouter = require('./Router/public_user_router');
const newGrievanceRouter = require('./Router/new_grievance_router');
const newGrievanceAttachmentRouter = require('./Router/new_grievance_attachment_router');
const grievanceLogRouter = require('./Router/grievance_log_router');
const grievanceAssignmentRouter = require('./Router/grievance_assignment_router');
const grievanceWorksheetRouter = require('./Router/grievance_worksheet_router');
const grievanceWorksheetAttachmentRouter = require('./Router/grievance_worksheet_attachment_router');
const grievanceEscalationRouter = require('./Router/grievance_escalation_router');
const roleRouter = require('./Router/role_router');
const roleAccessLevelRouter = require('./Router/role_access_level_router');
const DepartmentRouter=require('./Router/department_routes')
const OrganzationRouter=require('./Router/organization_routes');

app.use(body_parser.json());
app.use(cors());

app.use('/zone', zoneRouter);
app.use('/ward', wardRouter);
app.use('/street', streetRouter);
app.use('/complaint', complaintRouter);
app.use('/grievance-status', grievanceStatusRouter);
app.use('/user', userRouter);
app.use('/public-user', publicUserRouter);
app.use('/new-grievance', newGrievanceRouter);
app.use('/new-grievance-attachment', newGrievanceAttachmentRouter);
app.use('/grievance-log', grievanceLogRouter);
app.use('/grievance-assignment', grievanceAssignmentRouter);
app.use('/grievance-worksheet', grievanceWorksheetRouter);
app.use('/grievance-worksheet-attachment', grievanceWorksheetAttachmentRouter);
app.use('/grievance-escalation', grievanceEscalationRouter);
app.use('/role', roleRouter);
app.use('/role-access-level', roleAccessLevelRouter);
app.use('/department',DepartmentRouter);
app.use('/organization',OrganzationRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
