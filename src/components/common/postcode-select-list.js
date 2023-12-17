import { useState } from "react";
import { Select, MenuItem } from "@material-ui/core";
import countries from "i18n-iso-countries";

// Import the languages you want to use
import enLocale from "i18n-iso-countries/langs/en.json";
import itLocale from "i18n-iso-countries/langs/it.json";

export default function PostCodeSelectList(props) {

    const [selectedPostCode, setSelectedPostCode] = useState(props.selectedPostCode);

    const selectPostCodeHandler = (value) => {
        setSelectedPostCode(value);
        // callback to output
        props.selectPostCodeHandler(value);
    };

    // Have to register the languages you want to use
    countries.registerLocale(enLocale);
    countries.registerLocale(itLocale);

    // Returns an object not a list
    const countryObj = countries.getNumericCodes();

    const countryArr = Object.entries(countryObj).map(([key, value]) => {
        return {
            label: value,
            value: key
        };
    });

    return (
        <div>
            <Select
                style={{ width: "150px" }}
                value={selectedPostCode}
                onChange={(e) => {
                    selectPostCodeHandler(e.target.value);
                }
                }>
                {!!countryArr?.length &&
                    countryArr.map(({ label, value }) => (
                        <MenuItem key={value} value={value}>
                            {value} - {label}
                        </MenuItem>
                    ))}
            </Select>
        </div>
    );
}