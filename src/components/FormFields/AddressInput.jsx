import { useState, useEffect } from 'react';
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng,
} from 'react-google-places-autocomplete';

const Option = (props) => {
  const {
    className,
    cx,
    getStyles,
    isDisabled,
    isFocused,
    isSelected,
    innerRef,
    innerProps,
    data,
  } = props;
  return (
    <div
      ref={innerRef}
      style={getStyles('option', props)}
      className={cx(
        {
          option: true,
          'option--is-disabled': isDisabled,
          'option--is-focused': isFocused,
          'option--is-selected': isSelected,
        },
        className
      )}
      {...innerProps}
    >
      <div style={{ fontSize: 14 }}>{data.value.structured_formatting.main_text}</div>
      <span style={{ fontSize: 11 }}>{data.value.structured_formatting.secondary_text}</span>
    </div>
  );
};

export default function AddressInput({ address, setAddress }) {
  const [addressObj, setAddressObj] = useState();

  const getAddressObject = (address_components) => {
    const ShouldBeComponent = {
      street_number: ['street_number'],
      postal_code: ['postal_code'],
      street: ['street_address', 'route'],
      province: ['administrative_area_level_1'],
      city: ['locality'],
      country: ['country'],
    };

    let address = {
      street_number: '',
      postal_code: '',
      street: '',
      province: '',
      city: '',
      country: '',
    };

    address_components.forEach((component) => {
      for (var shouldBe in ShouldBeComponent) {
        if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
          if (shouldBe === 'country') {
            address[shouldBe] = component.short_name;
          } else {
            address[shouldBe] = component.long_name;
          }
        }
      }
    });

    // Fix the shape to match our schema
    address.address = address.street_number + ' ' + address.street;
    delete address.street_number;
    delete address.street;
    if (address.country === 'US') {
      address.state = address.province;
      delete address.province;
    }
    return address;
  };

  useEffect(() => {
    const func = async () => {
      const geocodeObj =
        address && address.value && (await geocodeByPlaceId(address.value.place_id));
      const addressObject = geocodeObj && getAddressObject(geocodeObj[0].address_components);
      setAddressObj(addressObject);
    };
    func();
  }, [address]);

  const handleSelectPlace = (place) => {
    geocodeByPlaceId(place.value.place_id)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setAddress({
          lat,
          lng,
          name: place.label,
        });
      });
  };

  return (
    <div>
      {/* <GooglePlacesAutocomplete
        apiOptions={{ language: 'vi', region: 'vn' }}
        autocompletionRequest={{
          location: { lat: 10.7757, lng: 106.7004 },
          radius: 1000,
          componentRestrictions: {
            country: ['vn'],
          },
        }}
        selectProps={{
          isClearable: true,
          value: address,

          onChange: handleSelectPlace,
          placeholder: '?????a ch???',
          noOptionsMessage: () => 'Kh??ng t??m th???y ?????a ch??? ph?? h???p!',
          loadingMessage: () => 'T??m ki???m..',
          styles: {
            input: (provided) => ({
              ...provided,
              boxShadow: 0,
              '&:hover': {
                border: '1px solid purple',
              },
            }),
            singleValue: (provided) => ({
              ...provided,
              boxShadow: 0,
              '&:hover': {
                border: '1px solid purple',
              },
            }),
          },
        }}
      /> */}
      <GooglePlacesAutocomplete
        apiOptions={{ language: 'vi', region: 'vn' }}
        autocompletionRequest={{
          location: { lat: 10.7757, lng: 106.7004 },
          radius: 1000,
          componentRestrictions: {
            country: ['vn'],
          },
        }}
        selectProps={{
          placeholder: '?????a ch???',
          className: `pito__place-container`,
          classNamePrefix: 'pito__place',
          onChange: handleSelectPlace,
          components: {
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
            Option,
          },
          noOptionsMessage: () => 'Kh??ng t??m th???y ?????a ch??? ph?? h???p!',
          loadingMessage: () => 'T??m ki???m..',
        }}
      />
    </div>
  );
}

// import React from "react";
// import GooglePlacesAutocomplete, {
//   geocodeByPlaceId,
//   getLatLng
// } from "react-google-places-autocomplete";

// const Option = (props) => {
//   const {
//     className,
//     cx,
//     getStyles,
//     isDisabled,
//     isFocused,
//     isSelected,
//     innerRef,
//     innerProps,
//     data
//   } = props;
//   return (
//     <div
//       ref={innerRef}
//       style={getStyles("option", props)}
//       className={cx(
//         {
//           option: true,
//           "option--is-disabled": isDisabled,
//           "option--is-focused": isFocused,
//           "option--is-selected": isSelected
//         },
//         className
//       )}
//       {...innerProps}
//     >
//       <div style={{ fontSize: 14 }}>
//         {data.value.structured_formatting.main_text}
//       </div>
//       <span style={{ fontSize: 11 }}>
//         {data.value.structured_formatting.secondary_text}
//       </span>
//     </div>
//   );
// };

// function PlaceInput({ setLocation, customClassName = '' }) {
//   const handleSelectPlace = (place) => {
//     geocodeByPlaceId(place.value.place_id)
//       .then((results) => getLatLng(results[0]))
//       .then(({ lat, lng }) => {
//         setLocation({
//           lat,
//           lng,
//           name: place.label,
//         });
//       });
//   };

//   return (
//     <GooglePlacesAutocomplete
//       apiOptions={{ language: 'vi', region: 'vn' }}
//       autocompletionRequest={{
//         location: { lat: 10.7757, lng: 106.7004 },
//         radius: 1000,
//         componentRestrictions: {
//           country: ['vn'],
//         },
//       }}
//       selectProps={{
//         placeholder: '?????a ch???',
//         className: `pito__place-container ${customClassName}`,
//         classNamePrefix: 'pito__place',
//         onChange: handleSelectPlace,
//         components: {
//           DropdownIndicator: () => null,
//           IndicatorSeparator: () => null,
//           Option,
//         },
//         noOptionsMessage: () => 'Kh??ng t??m th???y ?????a ch??? ph?? h???p!',
//         loadingMessage: () => 'T??m ki???m..',
//       }}
//     />
//   );
// }

// export default PlaceInput;

// API key AIzaSyDOR0RrkeXb4JCKO_aD1RITLQiJJZByR50
