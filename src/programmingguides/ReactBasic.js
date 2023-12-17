

// ===== State là gì?
// Các thành phần thường cần thay đổi nội dung trên màn hình do tương tác.
// Các thành phần cần “ghi nhớ” những giá trị
// Trong React, loại bộ nhớ dành riêng cho thành phần này được gọi là trạng thái.

// ===== So sánh regular variable & state variable
// Regular variable không tồn tại giữa các lần renders
// Các thay đổi đối với biến cục bộ sẽ không kích hoạt renders lại component

// Một biến trạng thái có thể bảo tồn giá trị của biến giữa các lần renders.
// Hàm thiết lập trạng thái để cập nhật biến và kích hoạt React để kết xuất lại thành phần.

// HOOK
// Step 1: import useState from React
import { useState } from 'react';

// Step 2: Declare state variable
// index is a state variable and setIndex is the setter function
const [x, setX] = useState(0);  // store any kind of JavaScript value in state
setX(5);                        // change value

// Class



// ===== Reducer là gì?
// Components có nhiều cập nhật trạng thái trải rộng trên 
// nhiều trình xử lý sự kiện có thể trở nên quá tải. Đối với 
// những trường hợp này,  có thể hợp nhất tất cả logic cập nhật 
// trạng thái bên ngoài Components trong một chức năng duy nhất, 
// được gọi là bộ giảm tốc.

import { useReducer } from 'react';

// Step 1: Move from setting state to dispatching actions
dispatch({
    // specific to component
    type: 'what_happened',
    // other fields go here
});

// Step 2: Write a reducer function
function tasksReducer(tasks, action) {
    switch (action.type) {
        case 'added': {
            return [
                ...tasks,
                {
                    id: action.id,
                    text: action.text,
                    done: false,
                },
            ];
        }
        case 'changed': {
            return (<></>);
        }
        case 'deleted': {
            return (<></>);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

// Step 3: Use the reducer from your component
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

// ===== Context là gì?
// Context cho phép parent component cung cấp một số thông tin
// cho bất kỳ component nào trong cây bên dưới nó bất kể sâu đến
// đâu—mà không chuyển thông tin đó một cách rõ ràng thông qua các props.

// ===== Pure component là gì?
// Pure component so sánh trạng thái hiện tại với trạng thái mới
// và các props hiện tại với các props mới bất cứ khi nào phương thức
// setState() được gọi. Vì vậy, điều này sẽ giúp giảm thiểu các cuộc gọi
// không cần thiết đến phương thức render().

// ===== useMemo
// useMemo là một React Hook cho phép bạn lưu trữ kết quả tính toán giữa các lần kết xuất lại.
// const cachedValue = useMemo(calculateValue, dependencies)
// calculateValue:  Trường hợp dependencies giá trị không thay đổi thì React sẽ trả lại cùng một giá trị (của calculateValue đã gọi trước đó)
// dependencies:    Danh sách tất cả các giá trị phản ứng được tham chiếu bên trong calculateValue


// useCallback là một React Hook cho phép bạn cache định nghĩa hàm giữa các lần kết xuất lại.
// const cachedFn = useCallback(fn, dependencies)

// ===== memo
// memo cho phép bỏ qua việc render lại một thành phần khi các giá trị của nó không thay đổi.
// const MemoizedComponent = memo(SomeComponent, arePropsEqual?)
// SomeComponent: including functions and forwardRef components, is accepted.
// arePropsEqual:

// ===== Differences between Functional Components and Class Components

// Definition:
// Functional Components: chỉ là một hàm thuần JavaScript minh bạch chấp nhận các props làm đối số và trả về 1 phần tử React (JSX).
// Class Components: Lớp JavaScript mở rộng React.Component và có phương thức render() trả về phần tử JSX

// State
// Functional Components: Sử dụng React Hooks để quản lý trạng thái
// Class Components: Có quản lý trạng thái tích hợp bằng cách sử dụng this.state

// Lifecycle Methods
// Functional Components: Sử dụng React Hook để xử lý các sự kiện trong vòng đời như useState, useEffect, useMemo.
// Class Components: Sử dụng các phương thức vòng đời của lớp như thành componentDidMount, thành componentDidUpdate và thành componentWillUnmount

// Props
// Functional Components: Props được truyền dưới dạng tham số cho hàm
// Class Components: Props được truy cập thông qua this.props

// Render
// Thành phần này được xác định trong thân hàm và được trả về dưới dạng phần tử JSX
// Phương thức render() là bắt buộc và trả về phần tử JSX

// Code Clarity
// Đơn giản và ngắn gọn
// Dài dòng hơn và khó đọc hơn

// Performance
// Giúp bạn sẵn sàng làm theo các phương pháp hay nhất
// Dễ gây ra vấn đề về hiệu suất hơn


// A component's lifecycle
// có ba giai đoạn chính: Mounting | Updating | Unmounting
// The Mounting Phase begins when a component is first created and inserted into the DOM.
// // constructor() => getDerivedStateFromProps(props, state) => render() =>  componentDidMount()
// // render(): Được gọi mỗi khi props hoặc trạng thái của  thay đổi hoặc do thành phần gốc đã được kết xuất lại.
// // componentDidMount() được gọi khi thành phần đã được gắn vào DOM. Sử dụng để thiết lập mọi trình xử lý sự kiện hoặc bộ hẹn giờ cần thiết, thực hiện mọi lệnh gọi API hoặc tìm nạp dữ liệu cần thiết
// // getDerivedStateFromProps(): Được gọi cho mỗi chu kỳ kết xuất và tạo cơ hội cập nhật trạng thái của thành phần dựa trên những thay đổi về props trước lần kết xuất đầu tiên.

// The Updating Phase occurs when a component's state or props change.
// // shouldComponentUpdate()
// // shouldComponentUpdate(nextProps, nextState):   trả về một giá trị boolean xác định xem thành phần có nên cập nhật hay không
// // componentWillUpdate(nextProps, nextState): được gọi ngay trước khi chu kỳ cập nhật của thành phần bắt đầu
// componentWillUpdate(nextProps, nextState) {
//     if (nextState.count !== this.state.count) {
//       console.log(`Count is about to update from ${this.state.count} to ${nextState.count}.`);
//     }
//   }
// // componentDidUpdate(): được gọi sau khi một thành phần được cập nhật và kết xuất lại
// // Nó rất hữu ích để thực hiện các hiệu ứng phụ hoặc các hoạt động bổ sung khi props  hoặc trạng thái của thành phần đã thay đổi.
// componentDidUpdate(prevProps, prevState) {
//     if (prevState.count !== this.state.count) {
//       console.log('Count has been updated:', this.state.count);
//     }

//   }
// And the Unmounting Phase occurs when a component is removed from the DOM