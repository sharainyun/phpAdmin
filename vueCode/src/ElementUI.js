import Vue from 'vue';
import {
  Icon,
  Input,
  Select,
  Option,
  Button,
  Table,
  TableColumn,
  Loading,
  Pagination,
  MessageBox,
  Message,
  Notification,
  DatePicker,
  Checkbox,
  CheckboxGroup,
  TabPane,
  TimePicker,
  Tabs,
  Collapse,
  CollapseItem,
  Row,
  Col,
  Dialog,
  Form,
  FormItem,
  Menu,
  MenuItem,
  Upload,
  Radio,
  RadioGroup,
  Submenu,
  Switch,
  Cascader,
  Badge,
  Tree
} from 'element-ui'

Vue.use(Icon)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(TimePicker)
Vue.use(TabPane)
Vue.use(Tabs)
Vue.use(Loading.directive)
Vue.use(Pagination)
Vue.use(DatePicker)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(CollapseItem)
Vue.use(Collapse)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Upload)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Switch)
Vue.use(Cascader)
Vue.use(Badge)
Vue.use(Tree)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message