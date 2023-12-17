import React from "react";
import { useState } from 'react';
import './sidebar.css';
import { SideBarData } from "./sidebardata";
import {
    Link
} from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

function ReserveChilds(children, isChildCollapsed) {

    const [isCollapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!isCollapsed)
    }

    return (
        <ul className="sidebarlist" style={{
            display: (() => {
                if (!isChildCollapsed) {
                    return "none";
                } else {
                    return "block";
                }
            })()
        }}>
            {
                children && children.map((val, key) => {
                    return (
                        <li className="child-item" key={key}>
                            <Link to={val.path}>{val.icon}  {val.title}
                                <div className="btn-collapse" >
                                    {
                                        val.children && <button className="btn-children-collapse" onClick={toggleCollapsed}>
                                            {!isCollapsed ? <KeyboardDoubleArrowDownIcon /> : <KeyboardDoubleArrowRightIcon />}
                                        </button>
                                    }
                                </div>
                            </Link>
                            {
                                val.children &&
                                ReserveChilds(val.children, isCollapsed)
                            }
                        </li>
                    )
                })
            }
        </ul>
    );
}


export default function SideBar() {

    const [isCollapsed, setSidebarCollapsed] = useState(false);
    const [isChildCollapsed, setChildCollapsed] = useState(false);

    const toggleOpen = () => {
        setSidebarCollapsed(!isCollapsed)
    }

    const toggleCollapsed = () => {
        setChildCollapsed(!isChildCollapsed)
    }

    return (
        <div className={!isCollapsed ? "sidebar" : "sidebarclollapsed"}>
            <button className="buttoncollapsable" onClick={toggleOpen}>
                {isCollapsed ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon />}
            </button>
            <ul className="sidebarlist">
                {
                    SideBarData.map((val, key) => {
                        return (
                            <li className="item" key={key}>
                                <Link to={val.path}>{val.icon}  {val.title}
                                    <div className="btn-collapse" >
                                        {
                                            val.children && <button className="btn-children-collapse" onClick={toggleCollapsed}>
                                                {!isChildCollapsed ? <KeyboardDoubleArrowDownIcon /> : <KeyboardDoubleArrowRightIcon />}
                                            </button>
                                        }
                                    </div>
                                </Link>
                                {
                                    val.children &&
                                    ReserveChilds(val.children, isChildCollapsed)
                                }
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}