import React from 'react';
import './ServiceAndPolicy.scss';

function ServiceAndPolicy() {
    return (
        <div className="policy-container">
            <div className="policy-content">
                <h1>Terms & Conditions</h1>

                <section>
                    <h2>01. Terms & Conditions</h2>
                    <p>
                        Khi sử dụng nền tảng JobFinder, bạn đồng ý tuân theo các điều khoản và điều kiện được quy định
                        dưới đây. JobFinder là nền tảng kết nối giữa nhà tuyển dụng và người tìm việc, cung cấp dịch vụ
                        tạo hồ sơ, đăng tuyển dụng, tìm kiếm việc làm và các công cụ hỗ trợ nghề nghiệp.
                    </p>
                    <ul>
                        <li>
                            Người dùng phải cung cấp thông tin chính xác và chịu trách nhiệm với thông tin đăng tải.
                        </li>
                        <li>Nhà tuyển dụng không được đăng tin tuyển dụng giả mạo, phân biệt đối xử hoặc lừa đảo.</li>
                        <li>Người tìm việc không được sử dụng hồ sơ sai sự thật hoặc mạo danh người khác.</li>
                        <li>JobFinder có quyền từ chối hoặc xóa nội dung vi phạm các quy định nền tảng.</li>
                        <li>Tất cả các hoạt động trên nền tảng đều phải tuân thủ pháp luật Việt Nam hiện hành.</li>
                    </ul>
                </section>

                <section>
                    <h2>02. Limitations</h2>
                    <p>
                        JobFinder không chịu trách nhiệm pháp lý về bất kỳ thiệt hại hoặc tổn thất nào phát sinh từ việc
                        sử dụng sai mục đích, thông tin sai lệch từ người dùng, hoặc từ các hành vi bên thứ ba.
                    </p>
                    <ul>
                        <li>
                            Không đảm bảo việc người tìm việc sẽ được tuyển hoặc nhà tuyển dụng sẽ tuyển đúng ứng viên.
                        </li>
                        <li>
                            Nền tảng không chịu trách nhiệm nếu người dùng vi phạm quyền riêng tư hoặc bản quyền của
                            người khác.
                        </li>
                        <li>JobFinder có quyền khóa tài khoản vi phạm mà không cần thông báo trước.</li>
                        <li>Chúng tôi không chịu trách nhiệm về các giao dịch ngoài nền tảng giữa các bên.</li>
                    </ul>
                </section>

                <section>
                    <h2>03. Security</h2>
                    <p>
                        JobFinder cam kết bảo vệ thông tin cá nhân của người dùng. Chúng tôi sử dụng các biện pháp kỹ
                        thuật và tổ chức phù hợp để đảm bảo an toàn dữ liệu. Tuy nhiên, người dùng cũng cần bảo mật tài
                        khoản và không chia sẻ thông tin đăng nhập với người khác.
                    </p>
                    <ul>
                        <li>Mật khẩu người dùng được mã hóa và không lưu dưới dạng văn bản thuần.</li>
                        <li>Các hoạt động bất thường sẽ được ghi nhận và xử lý kịp thời.</li>
                        <li>Người dùng nên đổi mật khẩu thường xuyên để tăng độ an toàn.</li>
                        <li>JobFinder không bao giờ yêu cầu người dùng cung cấp mật khẩu qua email.</li>
                    </ul>
                </section>

                <section>
                    <h2>04. Privacy Policy</h2>
                    <p>
                        Thông tin cá nhân của người dùng như tên, email, số điện thoại, kinh nghiệm làm việc... chỉ được
                        sử dụng cho mục đích hỗ trợ kết nối tuyển dụng. Chúng tôi không bán hoặc chia sẻ dữ liệu cá nhân
                        cho bên thứ ba mà không có sự đồng ý của người dùng.
                    </p>
                    <ul>
                        <li>Dữ liệu hồ sơ được sử dụng để gợi ý việc làm và hỗ trợ tuyển dụng phù hợp.</li>
                        <li>Người dùng có thể tùy chỉnh mức độ hiển thị hồ sơ cá nhân.</li>
                        <li>JobFinder chỉ chia sẻ thông tin cho đối tác tin cậy có ký thỏa thuận bảo mật.</li>
                        <li>Bạn có quyền yêu cầu chỉnh sửa hoặc xóa dữ liệu bất kỳ lúc nào.</li>
                        <li>Mọi thay đổi chính sách bảo mật sẽ được thông báo công khai trên nền tảng.</li>
                    </ul>
                    <p>
                        Việc tiếp tục sử dụng dịch vụ sau khi chính sách được cập nhật đồng nghĩa với việc bạn đồng ý
                        với các thay đổi đó.
                    </p>
                </section>
            </div>

            <div className="policy-sidebar">
                <div className="sidebar-title">TABLE OF CONTENTS</div>
                <ul>
                    <li>01. Terms & Conditions</li>
                    <li>02. Limitations</li>
                    <li>03. Security</li>
                    <li>04. Privacy Policy</li>
                </ul>
            </div>
        </div>
    );
}

export default ServiceAndPolicy;
