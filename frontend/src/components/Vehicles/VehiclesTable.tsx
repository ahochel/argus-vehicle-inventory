import React from 'react';
import {
  ActionIcon,
  Group,
  LoadingOverlay,
  Table as TableComponent,
} from '@mantine/core';
import { Edit, InfoCircle, Trash } from 'tabler-icons-react';
import { VehicleForm } from '../VehicleModalForm';
import { formatLocaleDateTime } from '../../helpers/formatLocaleDateTime';

type GeoLocationPoint = {
  latitude: number;
  longitude: number;
};

export type VehicleData = {
  _id: string;
  vehicleName: string;
  createdAt: string;
  carType: VehicleForm['carType'];
  lastSuccessfulConn: string;
  lastGeolocationPoint: GeoLocationPoint;
}[];

type VehicleTableProps = {
  isLoading: boolean;
  data: VehicleData | null;
  onEdit: (id: string, vehicleObject: VehicleForm) => void;
  onDelete: (id: string, vehicleObject: VehicleForm) => void;
};

const formatGeolocationPoint = (
  geoLocationPoint: GeoLocationPoint | undefined
) => {
  if (!geoLocationPoint) {
    return '';
  }

  const { latitude, longitude } = geoLocationPoint;

  return `${latitude}, ${longitude}`;
};

function VehiclesTable({
  isLoading,
  data,
  onEdit,
  onDelete,
}: VehicleTableProps) {
  const rows =
    data &&
    ((data.length === 0 && (
      <tr>
        <td colSpan={6}>
          <Group position="center">
            <InfoCircle />
            No Vehicles added yet
          </Group>
        </td>
      </tr>
    )) ||
      data.map((element) => (
        // FIXME: Rename rename to vehicleId
        // eslint-disable-next-line no-underscore-dangle
        <tr key={element._id}>
          <td>{element.vehicleName}</td>
          <td>{element.carType}</td>
          <td>{formatLocaleDateTime(element.createdAt)}</td>
          <td>{formatLocaleDateTime(element.lastSuccessfulConn)}</td>
          <td>{formatGeolocationPoint(element.lastGeolocationPoint)}</td>
          <td>
            <Group position="left">
              <ActionIcon
                variant="default"
                onClick={() =>
                  // eslint-disable-next-line no-underscore-dangle
                  onEdit(element._id, {
                    vehicleName: element.vehicleName,
                    carType: element.carType,
                  })
                }
                size={30}
              >
                <Edit size={16} color="#4065bf" />
              </ActionIcon>
              <ActionIcon
                variant="default"
                onClick={() =>
                  // eslint-disable-next-line no-underscore-dangle
                  onDelete(element._id, {
                    vehicleName: element.vehicleName,
                    carType: element.carType,
                  })
                }
                size={30}
              >
                <Trash size={16} color="#bf4140" />
              </ActionIcon>
            </Group>
          </td>
        </tr>
      )));

  return (
    <div style={{ position: 'relative' }}>
      <LoadingOverlay visible={isLoading} />
      <TableComponent highlightOnHover>
        <thead>
          <tr>
            <th>Vehicle name</th>
            <th>Car Type</th>
            <th>Creation date</th>
            <th>Last successful connection</th>
            <th>Last geolocation point</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </TableComponent>
    </div>
  );
}

export default VehiclesTable;
