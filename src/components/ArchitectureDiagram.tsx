import { useMemo, useState } from 'react';

import {
  CATEGORIES,
  CLUSTERS,
  EDGES,
  NODES,
  Node,
} from '../data/architecture';

const ArchitectureDiagram = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodeMap = useMemo(() => {
    const map = new Map<string, Node>();
    NODES.forEach((node) => map.set(node.id, node));
    return map;
  }, []);

  // 양방향 화살표 감지
  const bidirectionalEdges = useMemo(() => {
    const biMap = new Map<string, boolean>();
    EDGES.forEach((edge) => {
      const reverseKey = `${edge.target}-${edge.source}`;
      if (biMap.has(reverseKey)) {
        biMap.set(`${edge.source}-${edge.target}`, true);
        biMap.set(reverseKey, true);
      } else {
        biMap.set(`${edge.source}-${edge.target}`, false);
      }
    });
    return biMap;
  }, []);

  // 노드와 연결된 엣지 찾기
  const getConnectedEdges = (nodeId: string): Set<string> => {
    const connected = new Set<string>();
    EDGES.forEach((edge) => {
      if (edge.source === nodeId || edge.target === nodeId) {
        connected.add(edge.id);
      }
    });
    return connected;
  };

  return (
    <section className="diagram-card">
      <div className="legend">
        {Object.entries(CATEGORIES).map(([key, value]) => (
          <div key={key} className="legend-item">
            <span className="legend-swatch" style={{ background: value.color }} />
            <span>{value.label}</span>
          </div>
        ))}
      </div>

      <div className="diagram" role="img" aria-label="Raika the Wolfdog 시스템 아키텍처 다이어그램">
        <svg viewBox="0 0 2400 1300" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* 각 엣지 색상에 맞는 화살표 마커 생성 */}
            {EDGES.map((edge) => {
              const color = edge.stroke ?? 'rgba(212, 219, 255, 0.4)';
              return (
                <marker
                  key={`marker-${edge.id}`}
                  id={`arrowhead-${edge.id}`}
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="2.5"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <path d="M0,0 L6,2.5 L0,5 Z" fill={color} />
                </marker>
              );
            })}
          </defs>

          {CLUSTERS.map((cluster) => (
            <g key={cluster.id} className="cluster">
              <rect
                x={cluster.x}
                y={cluster.y}
                width={cluster.width}
                height={cluster.height}
                rx={24}
                ry={24}
                fill="rgba(15, 25, 52, 0.32)"
                stroke="rgba(99, 124, 255, 0.18)"
              />
              <text x={cluster.x + 20} y={cluster.y + 34} className="cluster-title">
                {cluster.title}
              </text>
              {cluster.description && (
                <text x={cluster.x + 20} y={cluster.y + 56} className="cluster-subtitle">
                  {cluster.description}
                </text>
              )}
            </g>
          ))}

          {EDGES.map((edge) => {
            const source = nodeMap.get(edge.source);
            const target = nodeMap.get(edge.target);

            if (!source || !target) {
              return null;
            }

            // 양방향 화살표 체크
            const edgeKey = `${edge.source}-${edge.target}`;
            const isBidirectional = bidirectionalEdges.get(edgeKey) ?? false;
            
            // 양방향인 경우 offset 적용 (source id가 알파벳순으로 빠른 쪽을 위로)
            const offset = isBidirectional ? (edge.source < edge.target ? -12 : 12) : 0;

            // 상자의 경계 계산 (중심점 기준)
            const sourceLeft = source.x - source.width / 2;
            const sourceRight = source.x + source.width / 2;
            const sourceTop = source.y - source.height / 2;
            const sourceBottom = source.y + source.height / 2;

            const targetLeft = target.x - target.width / 2;
            const targetRight = target.x + target.width / 2;
            const targetTop = target.y - target.height / 2;
            const targetBottom = target.y + target.height / 2;

            // 방향 벡터 계산
            const dx = target.x - source.x;
            const dy = target.y - source.y;

            // 시작점: source 박스의 적절한 변의 중앙
            let startX: number;
            let startY: number;

            // 수평 vs 수직 방향 우세도 비교
            const absDx = Math.abs(dx);
            const absDy = Math.abs(dy);

            if (absDx > absDy) {
              // 수평 방향이 우세
              if (dx > 0) {
                // 오른쪽으로
                startX = sourceRight;
                startY = source.y + offset;
              } else {
                // 왼쪽으로
                startX = sourceLeft;
                startY = source.y + offset;
              }
            } else {
              // 수직 방향이 우세
              if (dy > 0) {
                // 아래로
                startX = source.x + offset;
                startY = sourceBottom;
              } else {
                // 위로
                startX = source.x + offset;
                startY = sourceTop;
              }
            }

            // 끝점: target 박스의 적절한 변의 중앙
            let endX: number;
            let endY: number;

            if (absDx > absDy) {
              // 수평 방향이 우세
              if (dx > 0) {
                // 왼쪽에서 들어옴
                endX = targetLeft;
                endY = target.y + offset;
              } else {
                // 오른쪽에서 들어옴
                endX = targetRight;
                endY = target.y + offset;
              }
            } else {
              // 수직 방향이 우세
              if (dy > 0) {
                // 위에서 들어옴
                endX = target.x + offset;
                endY = targetTop;
              } else {
                // 아래에서 들어옴
                endX = target.x + offset;
                endY = targetBottom;
              }
            }

            // Bezier 곡선을 위한 제어점 계산
            let controlX1: number;
            let controlY1: number;
            let controlX2: number;
            let controlY2: number;

            const curvature = 0.5; // 곡선의 부드러움 정도

            if (absDx > absDy) {
              // 수평 방향: 좌우 제어점
              const midX = (startX + endX) / 2;
              controlX1 = startX + (midX - startX) * curvature;
              controlY1 = startY;
              controlX2 = endX - (endX - midX) * curvature;
              controlY2 = endY;
            } else {
              // 수직 방향: 상하 제어점
              const midY = (startY + endY) / 2;
              controlX1 = startX;
              controlY1 = startY + (midY - startY) * curvature;
              controlX2 = endX;
              controlY2 = endY - (endY - midY) * curvature;
            }

            // SVG path 생성 (Cubic Bezier Curve)
            const pathData = `M ${startX},${startY} C ${controlX1},${controlY1} ${controlX2},${controlY2} ${endX},${endY}`;

            // 라벨 위치 (곡선의 중간점 근사)
            let labelX = (startX + controlX1 + controlX2 + endX) / 4;
            let labelY = (startY + controlY1 + controlY2 + endY) / 4;

            // 양방향 화살표인 경우 라벨 위치도 offset 적용
            if (isBidirectional) {
              if (absDx > absDy) {
                // 수평 방향: 라벨 Y좌표 조정 (위/아래로)
                labelY += offset;
              } else {
                // 수직 방향: 라벨 X좌표 조정 (좌/우로)
                labelX += offset * 2; // 화살표보다 더 띄워서 가독성 향상
              }
            }

            // 하이라이트 여부 확인
            const connectedEdges = hoveredNode ? getConnectedEdges(hoveredNode) : null;
            const isHighlighted = connectedEdges ? connectedEdges.has(edge.id) : false;
            const isDimmed = hoveredNode && !isHighlighted;

            const edgeClassName = `edge ${isDimmed ? 'dimmed' : ''} ${isHighlighted ? 'highlighted' : ''}`;
            const labelClassName = `edge-label ${isDimmed ? 'dimmed' : ''}`;

            return (
              <g key={edge.id} className="edge-group">
                <path
                  className={edgeClassName}
                  d={pathData}
                  stroke={edge.stroke ?? 'rgba(212, 219, 255, 0.4)'}
                  markerEnd={`url(#arrowhead-${edge.id})`}
                />
                {edge.label && (
                  <text className={labelClassName} x={labelX} y={labelY - 6}>
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}

          {NODES.map((node) => {
            const topLeftX = node.x - node.width / 2;
            const topLeftY = node.y - node.height / 2;

            return (
              <g 
                key={node.id} 
                className="node"
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <rect
                  x={topLeftX}
                  y={topLeftY}
                  width={node.width}
                  height={node.height}
                  rx={18}
                  ry={18}
                  fill="rgba(6, 12, 28, 0.9)"
                  stroke={CATEGORIES[node.category].color}
                />
                <text x={node.x} y={node.y - 6} className="node-title">
                  {node.title}
                </text>
                {node.subtitle && (
                  <text x={node.x} y={node.y + 18} className="node-subtitle">
                    {node.subtitle}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
};

export default ArchitectureDiagram;

