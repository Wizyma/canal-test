import { Card, Image, Text } from '@zeit-ui/react';

import { IMAGE_BASE_PATH } from 'constants/index';

export default function Tile({
  title,
  poster_path,
  onClick,
}: {
  title: string;
  poster_path: string;
  onClick?: () => void;
}) {
  return (
    <Card onClick={onClick} shadow>
      <Image
        height={600}
        width={400}
        style={{ objectFit: 'cover' }}
        src={`${IMAGE_BASE_PATH}${poster_path}`}
      />
      <Card.Content style={{ width: 'auto' }}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 700,
          }}
        >
          {title}
        </Text>
      </Card.Content>
    </Card>
  );
}
