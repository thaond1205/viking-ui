import React from 'react';

const Loading = () => {
    return (
        <div>
          <div style={{ textAlign: 'center', marginTop: '20px', color: 'red', fontWeight: 'bold' }}>
            ĐANG KIỂM TRA QUYỀN TRUY CẬP!
          </div>
          <div style={{ textAlign: 'center', marginTop: '5px', color: 'blue'}}>
            Xin chờ trong giây lát!
          </div>
          <div class="loader"></div>
        </div>
    );
};

export default Loading;