import { useState, useEffect } from "react";

import {
    TextField,
    Grid,
    MenuItem
} from "@mui/material";

import { getAddresses } from "../../services/addressService";


function CustomerForm({

    customer,
    onSave

}) {

    // =====================================================
    // ADDRESSES
    // =====================================================

    const [addresses, setAddresses] = useState([]);

    useEffect(() => {

        loadAddresses();

    }, []);


    const loadAddresses = async () => {

        try {

            const response = await getAddresses();

            console.log("ADDRESSES:", response.data);

            setAddresses(response.data);

        }
        catch (error) {

            console.error(
                "ERROR LOADING ADDRESSES:",
                error
            );

        }

    };


    // =====================================================
    // FORM DATA
    // =====================================================

    const [formData, setFormData] = useState({

        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        addressId: ""

    });


    // =====================================================
    // LOAD CUSTOMER FOR EDIT
    // =====================================================

    useEffect(() => {

        if (customer) {

            setFormData({

                firstName: customer.firstName || "",
                lastName: customer.lastName || "",
                phone: customer.phone || "",
                email: customer.email || "",

                // IMPORTANT:
                // Keep addressId as STRING inside the Select

                addressId:
                    customer.addressId !== null &&
                    customer.addressId !== undefined
                        ? String(customer.addressId)
                        : ""

            });

        }
        else {

            // ADD CUSTOMER

            setFormData({

                firstName: "",
                lastName: "",
                phone: "",
                email: "",
                addressId: ""

            });

        }

    }, [customer]);


    // =====================================================
    // HANDLE CHANGE
    // =====================================================

   const handleChange = (event) => {

    const { name, value } = event.target;

    console.log("CHANGE:", name, value);

    setFormData((previous) => ({
        ...previous,
        [name]: value
    }));

};

    // =====================================================
    // HANDLE SUBMIT
    // =====================================================

    const handleSubmit = (event) => {

        event.preventDefault();


        const customerData = {

            ...formData,

            // Convert addressId back to Number
            // before sending it to Spring Boot

            addressId:
                formData.addressId === ""
                    ? null
                    : Number(formData.addressId)

        };


        console.log(
            "CUSTOMER DATA TO SAVE:",
            customerData
        );


        onSave(customerData);

    };


    // =====================================================
    // RENDER
    // =====================================================
console.log("FORM DATA:", formData);
    return (

        <form
            id="customer-form"
            onSubmit={handleSubmit}
        >

            <Grid
                container
                spacing={2}
                sx={{ mt: 1 }}
            >

                {/* =========================================
                    FIRST NAME
                ========================================= */}

                <Grid
                    size={{ xs: 12, md: 6 }}
                >

                    <TextField
                        fullWidth
                        required
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />

                </Grid>


                {/* =========================================
                    LAST NAME
                ========================================= */}

                <Grid
                    size={{ xs: 12, md: 6 }}
                >

                    <TextField
                        fullWidth
                        required
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />

                </Grid>


                {/* =========================================
                    PHONE
                ========================================= */}

                <Grid
                    size={{ xs: 12, md: 6 }}
                >

                    <TextField
                        fullWidth
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />

                </Grid>


                {/* =========================================
                    EMAIL
                ========================================= */}

                <Grid
                    size={{ xs: 12, md: 6 }}
                >

                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                </Grid>


                {/* =========================================
                    ADDRESS
                ========================================= */}

                <Grid
                    size={{ xs: 12 }}
                    sx={{
                        width: "100%"
                    }}
                >

                    <TextField
                        select
                        fullWidth
                        required
                        label="Address"
                        name="addressId"
                        value={formData.addressId}
                        onChange={handleChange}
                        sx={{
                            width: "100%"
                        }}
                    >

                        <MenuItem value="">
                            Select Address...
                        </MenuItem>


                        {addresses.map((address) => (

                            <MenuItem
                                key={address.addressId}
                                value={String(address.addressId)}
                            >

                                {address.country}
                                {" - "}
                                {address.city}
                                {" - "}
                                {address.street}
                                {" "}
                                {address.streetNumber}

                            </MenuItem>

                        ))}

                    </TextField>

                </Grid>

            </Grid>

        </form>

    );

}


export default CustomerForm;