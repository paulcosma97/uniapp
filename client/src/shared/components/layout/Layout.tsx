import React from "react";

const Layout: React.FC = props => (
    <div style={{ padding: '48px 10px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
        {props.children}
    </div>
);

export default Layout;