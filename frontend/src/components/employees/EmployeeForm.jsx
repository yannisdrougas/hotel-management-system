import { useEffect, useState } from "react";

import {
    Box,
    TextField,
    MenuItem,
    Button
} from "@mui/material";

import {
    getAddresses
} from "../../services/addressService";


const employeePositions = [
    "MANAGER",
    "RECEPTIONIST",
    "HOUSEKEEPING",
    "CHEF",
    "WAITER",
    "MAINTENANCE"
];


function EmployeeForm({
    employee,
    onSave
}) {

    // =====================================================
    // FORM DATA
    // =====================================================

    const [formData, setFormData] = useState({

        firstName: "",
        lastName: "",
        position: "",
        salary: "",
        hireDate: "",
        phone: "",
        addressId: ""

    });


    // =====================================================
    // ADDRESSES
    // =====================================================

    const [addresses, setAddresses] =
        useState([]);


    // =====================================================
    // LOAD ADDRESSES
    // =====================================================

    useEffect(() => {

        loadAddresses();

    }, []);


    const loadAddresses = async () => {

        try {

            const response =
                await getAddresses();

            setAddresses(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        }
        catch (error) {

            console.error(
                "Failed to load addresses:",
                error
            );

            setAddresses([]);

        }

    };


    // =====================================================
    // LOAD EMPLOYEE FOR EDIT
    // =====================================================

    useEffect(() => {

        if (employee) {

            setFormData({

                firstName:
                    employee.firstName ?? "",

                lastName:
                    employee.lastName ?? "",

                position:
                    employee.position ?? "",

                salary:
                    employee.salary !== null &&
                    employee.salary !== undefined
                        ? employee.salary
                        : "",

                hireDate:
                    employee.hireDate ?? "",

                phone:
                    employee.phone ?? "",

                addressId:
                    employee.addressId !== null &&
                    employee.addressId !== undefined
                        ? Number(employee.addressId)
                        : ""

            });

        }
        else {

            setFormData({

                firstName: "",
                lastName: "",
                position: "",
                salary: "",
                hireDate: "",
                phone: "",
                addressId: ""

            });

        }

    }, [employee]);


    // =====================================================
    // HANDLE CHANGE
    // =====================================================

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setFormData(
            previous => ({

                ...previous,

                [name]: value

            })
        );

    };


    // =====================================================
    // HANDLE SUBMIT
    // =====================================================

    const handleSubmit = (event) => {

        event.preventDefault();


        const employeeData = {

            firstName:
                formData.firstName,

            lastName:
                formData.lastName,

            position:
                formData.position,

            salary:
                Number(formData.salary),

            hireDate:
                formData.hireDate || null,

            phone:
                formData.phone,

            addressId:
                formData.addressId === ""
                    ? null
                    : Number(formData.addressId)

        };


        console.log(
            "EMPLOYEE TO SAVE:",
            employeeData
        );


        onSave(employeeData);

    };


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <Box
            component="form"
            id="employee-form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mt: 1
            }}
        >

            {/* =================================================
                FIRST NAME
            ================================================= */}

            <TextField

                fullWidth

                required

                label="First Name"

                name="firstName"

                value={formData.firstName}

                onChange={handleChange}

            />


            {/* =================================================
                LAST NAME
            ================================================= */}

            <TextField

                fullWidth

                required

                label="Last Name"

                name="lastName"

                value={formData.lastName}

                onChange={handleChange}

            />


            {/* =================================================
                POSITION
            ================================================= */}

            <TextField

                select

                fullWidth

                required

                label="Position"

                name="position"

                value={formData.position}

                onChange={handleChange}

            >

                <MenuItem value="">
                    Select Position
                </MenuItem>


                {employeePositions.map(
                    (position) => (

                        <MenuItem
                            key={position}
                            value={position}
                        >

                            {position}

                        </MenuItem>

                    )
                )}

            </TextField>


            {/* =================================================
                SALARY
            ================================================= */}

            <TextField

                fullWidth

                required

                type="number"

                label="Salary"

                name="salary"

                value={formData.salary}

                onChange={handleChange}

                inputProps={{
                    min: 0,
                    step: "0.01"
                }}

            />


            {/* =================================================
                HIRE DATE
            ================================================= */}

            <TextField

                fullWidth

                type="date"

                label="Hire Date"

                name="hireDate"

                value={formData.hireDate}

                onChange={handleChange}

                slotProps={{
                    inputLabel: {
                        shrink: true
                    }
                }}

            />


            {/* =================================================
                PHONE
            ================================================= */}

            <TextField

                fullWidth

                label="Phone"

                name="phone"

                value={formData.phone}

                onChange={handleChange}

            />


            {/* =================================================
                ADDRESS
            ================================================= */}

            <TextField

                select

                fullWidth

                label="Address"

                name="addressId"

                value={formData.addressId}

                onChange={handleChange}

            >

                <MenuItem value="">
                    No Address
                </MenuItem>


                {addresses.map(
                    (address) => (

                        <MenuItem

                            key={
                                address.addressId
                            }

                            value={
                                Number(
                                    address.addressId
                                )
                            }

                        >

                            {address.street}{" "}
                            {address.streetNumber},{" "}
                            {address.city},{" "}
                            {address.country}

                        </MenuItem>

                    )
                )}

            </TextField>


            {/* =================================================
                HIDDEN SAVE
            ================================================= */}

            <Button

                type="submit"

                variant="contained"

                sx={{
                    display: "none"
                }}

            >

                Save

            </Button>

        </Box>

    );

}


export default EmployeeForm;