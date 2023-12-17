import Clock from '../basic/Clock';
import ToggleButton from '../basic/ToggleButton';
import RunningNumber from '../basic/RunningNumber';
import PersonalSchedule from '../basic/PersonalSchedule';
import FormExploring from '../basic/FormExploring';
import SculpturePage from '../basic/SculpturePage';
import UpdateObjectForm from '../basic/UpdateObjectForm';

import ComponentWithPure from '../basic/PureComponent';
import RefExample from '../basic/RefExample';
import UseMemoExample from '../basic/UseMemoExample'
import CallBackExample from '../basic/CallBackExample';
import MemoExample from '../memoexample/MemoExample';
import PortalExample from '../basic/PortalExample/PortalExample';
import CloneElementExample from '../basic/CloneElementExample';
import VirtualizedBasic from '../basic/virtualized/VirtualizedBasic';
import VirtualizedTableShow from '../basic/virtualized/VirtualizedTableShow';
import VirtualizedTableBasic from '../basic/virtualized/VirtualizedTableBasic'

export default function BasicComponents() {
    return (
        <>
            <Clock name="Clock" />
            <ToggleButton name="ToggleButton" />
            <RunningNumber />
            <PersonalSchedule />
            <FormExploring hasPreventDefault={false} />
            <FormExploring hasPreventDefault={true} />
            <SculpturePage />
            <UpdateObjectForm />
            <ComponentWithPure />
            <RefExample />
            <UseMemoExample />
            <CallBackExample />
            <MemoExample />
            <PortalExample />
            <CloneElementExample />
            <VirtualizedBasic />
            <VirtualizedTableShow />
            <VirtualizedTableBasic />
        </>
    );
}