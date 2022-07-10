import React, { useEffect } from 'react';
import { Modal, Button, Group, TextInput, Box, Select } from '@mantine/core';
import { useForm } from '@mantine/form';

const carTypes: VehicleForm['carType'][] = ['SUV', 'Truck', 'Hybrid'];

export type VehicleForm = {
  vehicleName: string;
  carType: 'SUV' | 'Truck' | 'Hybrid';
};

type VehicleModalFormProps = {
  modalMode: 'Add' | 'Edit' | '';
  isOpened: boolean;
  onClose: () => void;
  onSubmit: (values: VehicleForm) => void;
  initialValues: VehicleForm | null;
};

const defaultInitialValues = {
  vehicleName: '',
  carType: carTypes[0],
};

function VehicleModalForm({
  modalMode,
  isOpened,
  onClose,
  onSubmit,
  initialValues,
}: VehicleModalFormProps) {
  const form = useForm<VehicleForm>({
    initialValues: initialValues || defaultInitialValues,
  });

  useEffect(() => {
    form.setValues(initialValues || defaultInitialValues);
    // TODO: Don't put form in deps because of some strange behavior that I don't have time to debug
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <Modal opened={isOpened} onClose={onClose} title={`${modalMode} Vehicle`}>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <TextInput
            required
            placeholder="Enter vehicle name"
            label="Vehicle name"
            {...form.getInputProps('vehicleName')}
          />

          <Select
            label="Car type"
            placeholder="Pick one"
            data={carTypes}
            {...form.getInputProps('carType')}
          />

          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
  /* eslint-enable react/jsx-props-no-spreading */
}

export default VehicleModalForm;
