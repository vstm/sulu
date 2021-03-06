// @flow
import Form from './Form';
import FormInspector from './FormInspector';
import fieldRegistry from './registries/FieldRegistry';
import FormStore from './stores/FormStore';
import Assignment from './fields/Assignment';
import DatePicker from './fields/DatePicker';
import Input from './fields/Input';
import SingleSelect from './fields/SingleSelect';
import ResourceLocator from './fields/ResourceLocator';
import Renderer from './Renderer';
import TextArea from './fields/TextArea';
import Time from './fields/Time';
import type {Schema, Types} from './types';

export {
    fieldRegistry,
    Assignment,
    DatePicker,
    Input,
    FormInspector,
    FormStore,
    Renderer,
    ResourceLocator,
    SingleSelect,
    TextArea,
    Time,
};
export type {Schema, Types};
export default Form;
