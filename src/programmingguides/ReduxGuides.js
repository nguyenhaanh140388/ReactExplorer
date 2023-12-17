
//*********REDUX*********//

// ===== Redux là gì?
// Redux là một pattern and library để quản lý và cập nhật trạng thái ứng dụng,
// sử dụng các sự kiện được gọi là "hành động"

// ===== Tại sao sử dụng Redux
// The patterns and tools do Redux cung cấp giúp dễ hiểu hơn khi nào, 
// ở đâu, tại sao và trạng thái trong ứng dụng đang được 
// cập nhật như thế nào cũng như logic ứng dụng sẽ hoạt 
// động như thế nào khi những thay đổi đó xảy ra

// ===== Redux được sử dụng khi:
// Có số lượng lớn trạng thái ứng dụng cần thiết ở nhiều nơi trong ứng dụng 
// Trạng thái ứng dụng được cập nhật thường xuyên theo thời gian 
// Logic để cập nhật trạng thái đó có thể phức tạp

// ===== StrictMode & Reducer
// StrictMode, trong quá trình phát triển, bộ giảm tốc được gọi hai lần 
// để giúp nhà phát triển phát hiện một số lỗi nhất định trong ứng dụng 
// của họ. Vì vậy, bạn không gửi hành động hai lần nhưng React đang tự 
// gọi bộ giảm tốc hai lần vì bạn đang ở StrictMode.