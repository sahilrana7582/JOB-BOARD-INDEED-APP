import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function FilterJob() {
  return (
    <>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort By</SelectLabel>
            <SelectItem value="apple">Company</SelectItem>
            <SelectItem value="banana">Job Role</SelectItem>
            <SelectItem value="blueberry">Application</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
