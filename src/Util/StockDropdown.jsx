import React from 'react'
import { DownOutlined } from "@ant-design/icons";
import { Dropdown } from 'antd';

const StockDropdown = ({stock, setStock}) => {
    const items = [
        {
          label: "In Stock",
          key: "In Stock",
        },
        {
          label: "Out of Stock",
          key: "Out of Stock",
        }
    ];

    const onClick = ({ key }) => {
        setStock(key);
        const params = new URLSearchParams(window.location.search);
        params.set('stock', key);
        window.history.pushState(null, "", `?${params.toString()}`);
      };
    return (
        <div
            style={{
              borderRadius: "6px",
              border: "1px solid #E9E9E9",
              display: "flex",
              flexDirection: 'column',
              color: "#8B8B8B",
              padding: "8px"
            }}
        >
            <Dropdown menu={{ items, onClick}} >
                <p 
                    style={{ 
                        cursor: "pointer", 
                        color:'#717171', 
                        borderRadius: "4px",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }} 
                     onClick={(e) => e.preventDefault()}
                >
                    {stock} <DownOutlined style={{paddingLeft: "18px"}} color='#717171' />
                </p>
            </Dropdown>
        </div>
    )
}

export default StockDropdown