import { useState } from "react";
import { Select, MenuItem } from "@material-ui/core";
import countries from "i18n-iso-countries";

// Import the languages you want to use
import enLocale from "i18n-iso-countries/langs/en.json";
import itLocale from "i18n-iso-countries/langs/it.json";

export default function ContrySelectList(props) {

    const [selectedCountry, setSelectedCountry] = useState(props.selectedCountry);

    const selectCountryHandler = (value) => {
        setSelectedCountry(value);

        // callback to output
        props.selectCountryHandler(value);
    };

    // Have to register the languages you want to use
    countries.registerLocale(enLocale);
    countries.registerLocale(itLocale);

    // Returns an object not a list
    const countryObj = countries.getNames("en", { select: "official" });

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
                value={selectedCountry}
                onChange={(e) => {
                    selectCountryHandler(e.target.value);
                }
                }>
                {!!countryArr?.length &&
                    countryArr.map(({ label, value }) => (
                        <MenuItem key={value} value={value}>
                            {label}
                        </MenuItem>
                    ))}
            </Select>
        </div>
    );
}