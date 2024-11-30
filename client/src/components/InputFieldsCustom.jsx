import React from 'react';
import { Input } from './ui/input';
import { LoaderCircle } from 'lucide-react';
import { Button } from './ui/button';

const InputFieldsCustom = ({
  initialData,
  data,
  setData,
  onClickHandleUpdate,
  isLoading,
  forWhat,
}) => {
  const fields = Object.keys(initialData);
  return (
    <>
      {fields?.map((field, id) => (
        <div key={id}>
          <Input
            value={data[field]}
            name={field}
            onChange={(e) =>
              setData({
                ...data,
                [e.target.name]: e.target.value,
              })
            }
            placeholder={`Your ${field}`}
          />
        </div>
      ))}
      <div className="col-span-3 flex gap-4 ">
        <Button className="w-full" onClick={() => onClickHandleUpdate(forWhat)}>
          {isLoading ? <LoaderCircle className="animate-spin" /> : 'Save'}
        </Button>
        <Button
          variant="destructive"
          className="w-full"
          onClick={() => setData(initialData)}
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

export default InputFieldsCustom;

//     <div>
//     <Input
//       value={basicInfo.age}
//       name="age"
//       onChange={(e) =>
//         setBasicInfo({
//           ...basicInfo,
//           [e.target.name]: e.target.value,
//         })
//       }
//       placeholder="Enter Your Age"
//     />
//   </div>
//   <div>
//     <Input
//       value={basicInfo.exp}
//       name="exp"
//       onChange={(e) =>
//         setBasicInfo({
//           ...basicInfo,
//           [e.target.name]: e.target.value,
//         })
//       }
//       placeholder="Years of Experience"
//     />
//   </div>{' '}
//   <div>
//     <Input
//       value={basicInfo.phnNumber}
//       name="phnNumber"
//       onChange={(e) =>
//         setBasicInfo({
//           ...basicInfo,
//           [e.target.name]: e.target.value,
//         })
//       }
//       placeholder="Phone Number"
//     />
//   </div>{' '}
//   <div>
//     <Input
//       value={basicInfo.currentCTC}
//       name="currentCTC"
//       onChange={(e) =>
//         setBasicInfo({
//           ...basicInfo,
//           [e.target.name]: e.target.value,
//         })
//       }
//       placeholder="Current CTC"
//     />
//   </div>{' '}
//   <div>
//     <Input
//       value={basicInfo.location}
//       name="location"
//       onChange={(e) =>
//         setBasicInfo({
//           ...basicInfo,
//           [e.target.name]: e.target.value,
//         })
//       }
//       placeholder="Location"
//     />
//   </div>{' '}
//   <div>
//     <Input value={user?.email} disabled />
//   </div>
