import React, { useCallback, useState } from 'react';
import { Button, Group, SimpleGrid, Title } from '@mantine/core';
import { CirclePlus } from 'tabler-icons-react';
import VehiclesTable, { VehicleData } from '../../Vehicles/VehiclesTable';
import useFetchData, { HTTPMethods } from '../../../hooks/useFetchData';
import ErrorNotification from '../../ErrorNotification';
import VehicleModalForm, { VehicleForm } from '../../VehicleModalForm';

function Vehicles() {
  const { isLoading, isError, data, triggerFetch } = useFetchData<{
    data: VehicleData;
  }>(HTTPMethods.GET, `${process.env.REACT_APP_BACKEND_API_URL}/vehicle`);
  const [modalMode, setModalMode] = useState<'Add' | 'Edit' | false>(false);
  const [editedVehicleID, setEditedVehicleID] = useState('');
  const [vehicleInitialValues, setVehicleInitialValues] =
    useState<VehicleForm | null>(null);

  const submitForm = useCallback(
    async (values: VehicleForm) => {
      const URLSuffix = (modalMode === 'Edit' && `/${editedVehicleID}`) || '';
      const requestOptions = {
        method: modalMode === 'Edit' ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      };
      await fetch(
        `${process.env.REACT_APP_BACKEND_API_URL}/vehicle${URLSuffix}`,
        requestOptions
      );
      // TODO: Add error and success handling
      setModalMode(false);
      triggerFetch();
    },
    [editedVehicleID, modalMode, triggerFetch]
  );

  const addVehicle = () => {
    setVehicleInitialValues(null);
    setModalMode('Add');
  };

  const editVehicle = (vehicleId: string, initialVehicleData: VehicleForm) => {
    setEditedVehicleID(vehicleId);
    setVehicleInitialValues(initialVehicleData);
    setModalMode('Edit');
  };

  const deleteVehicle = async (vehicleId: string) => {
    // TODO: Add prompt to ask: "Are you sure to remove..."

    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };
    await fetch(
      `${process.env.REACT_APP_BACKEND_API_URL}/vehicle/${vehicleId}`,
      requestOptions
    );
    triggerFetch();
    // TODO: Add error and success handling
  };

  return (
    <SimpleGrid cols={1} spacing="xl">
      {isError && <ErrorNotification>Cannot fetch Vehicles</ErrorNotification>}
      <Group position="apart">
        <Title order={1}>Vehicles</Title>
        <Button leftIcon={<CirclePlus />} onClick={addVehicle}>
          Add
        </Button>
      </Group>
      <VehiclesTable
        data={data && data.data}
        isLoading={isLoading}
        onEdit={editVehicle}
        onDelete={deleteVehicle}
      />
      <VehicleModalForm
        isOpened={!!modalMode}
        onSubmit={submitForm}
        modalMode={modalMode || ''}
        onClose={() => setModalMode(false)}
        initialValues={vehicleInitialValues}
      />
    </SimpleGrid>
  );
}

export default Vehicles;
