import React from "react";
import HomeIcon from '@material-ui/icons/Home'
import GroupIcon from '@material-ui/icons/Group';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import BasicComponents from '../basic.component'
import ReduxComponents from '../redux.component'
import SchoolIcon from '@mui/icons-material/School';
import SchemaIcon from '@mui/icons-material/Schema';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import ListEmployee from '../../ems/components/employee/employee-list';
import BenefitList from '../../ems/components/benefitlist';
import LeaveList from '../../ems/components/leavelist';
import AddressList from '../../ems/components/address/address-list';
import DepartmentList from '../../shop/components/department-management/department-list';
import CategoryList from '../../shop/components/caterogy-management/category-list';
import ProductList from '../../shop/components/product-management/product-list';
import ProductAdd from '../../shop/components/product-management/product-add';
import OrderList from '../../shop/components/order-management/order-list';
import OrderUpdate from '../../shop/components/order-management/order-update';

export const SideBarData = [
    {
        title: 'Home',
        icon: <HomeIcon />,
        path: '/Home',
        default: true,
        component: () => <h2>Home</h2>
    },
    {
        title: 'Shop-Management',
        icon: <ModelTrainingIcon />,
        path: '/shop-management',
        component: () => <h2>Shop-Management</h2>,
        children:
            [
                {
                    title: 'Department',
                    icon: <SchoolIcon />,
                    path: '/department-list',
                    component: () => <DepartmentList />
                },
                {
                    title: 'Category',
                    icon: <SchoolIcon />,
                    path: '/category-list',
                    component: () => <CategoryList />
                },
                {
                    title: 'Product',
                    icon: <SchoolIcon />,
                    path: '/product-list',
                    component: () => <ProductList />,
                    children:
                        [
                            {
                                title: 'Add product',
                                icon: <SchoolIcon />,
                                path: 'product-management/product-add',
                                component: () => <ProductAdd />
                            }
                        ]
                },
                {
                    title: 'Order',
                    icon: <SchoolIcon />,
                    path: '/order-list',
                    component: () => <OrderList />,
                    children:
                        [
                            {
                                title: 'Add order',
                                icon: <SchoolIcon />,
                                path: 'order-management/order-update',
                                component: () => <OrderUpdate />
                            }
                        ]
                }
            ]
    },
    // {
    //     title: 'Training',
    //     icon: <ModelTrainingIcon />,
    //     path: '/training',
    //     component: () => <h2>Training</h2>,
    //     children:
    //         [
    //             {
    //                 title: 'Basic',
    //                 icon: <SchoolIcon />,
    //                 path: '/basic',
    //                 component: () => <BasicComponents />
    //             },
    //             {
    //                 title: 'Redux',
    //                 icon: <SchemaIcon />,
    //                 path: '/redux',
    //                 component: () => <ReduxComponents />
    //             }
    //         ]
    // },
    // {
    //     title: 'Human Management System',
    //     icon: <HomeIcon />,
    //     path: '/HumanManagementSystem',
    //     component: () => <h2>Home</h2>,
    //     children:
    //         [
    //             {
    //                 title: 'Employee',
    //                 icon: <GroupIcon />,
    //                 path: '/employee',
    //                 component: () => <ListEmployee />,
    //                 children:
    //                     [
    //                         {
    //                             title: 'AddEmployee',
    //                             icon: <SchoolIcon />,
    //                             path: '/addemployee',
    //                             component: () => <h2>Add</h2>,
    //                         },
    //                         {
    //                             title: 'EditEmployee',
    //                             icon: <SchemaIcon />,
    //                             path: '/editemployee',
    //                             component: () => <h2>Update</h2>,
    //                         }
    //                     ]
    //             },
    //             {
    //                 title: 'Benefit',
    //                 icon: <ShowChartIcon />,
    //                 path: '/benefit',
    //                 component: () => <BenefitList />,
    //             },
    //             {
    //                 title: 'Leave',
    //                 icon: <ShowChartIcon />,
    //                 path: '/leave',
    //                 component: () => <LeaveList />,
    //             },
    //             {
    //                 title: 'Address',
    //                 icon: <ShowChartIcon />,
    //                 path: '/address',
    //                 component: () => <AddressList />,
    //             }
    //         ]
    // }
];