export interface Category {
  id: string;
  name: string;
  blurb: string;
  /** Matching id in data/taxonomy/domains.yaml at the repository root. */
  domain: string;
  /** Topics queued for this category. Shown until articles exist. */
  planned: string[];
}

export const categories: Category[] = [
  {
    id: 'actuators',
    name: 'Actuators & Drives',
    blurb: 'How robots turn electrical, fluid and chemical energy into force and motion.',
    domain: 'embedded-mechatronics',
    planned: ['Brushless motor construction and winding design', 'Dexterous hand actuation', 'Hydraulic and electro-hydrostatic actuators', 'Actuator testing and characterisation'],
  },
  {
    id: 'dynamics',
    name: 'Kinematics & Dynamics',
    blurb: 'Frames, Jacobians and the equations of motion that every controller leans on.',
    domain: 'mechanics',
    planned: ['Spatial vectors and twists', 'Contact models and friction', 'System identification'],
  },
  {
    id: 'sensors',
    name: 'Sensors',
    blurb: 'Encoders, IMUs, force/torque sensing, tactile skins, cameras and LiDAR.',
    domain: 'embedded-mechatronics',
    planned: ['Depth cameras and LiDAR', 'Current and temperature sensing', 'Sensor calibration and time synchronisation'],
  },
  {
    id: 'control',
    name: 'Control',
    blurb: 'From PID to impedance control, model-predictive control and whole-body control.',
    domain: 'control',
    planned: ['Whole-body control', 'State-space models and observers', 'Stability margins and loop shaping'],
  },
  {
    id: 'computer-vision',
    name: 'Computer Vision',
    blurb: 'Camera models, features, 3D vision and the learned perception stack.',
    domain: 'computer-vision',
    planned: ['Detection, segmentation and open-vocabulary perception', '6D object pose estimation', 'Visual servoing'],
  },
  {
    id: 'state-estimation',
    name: 'SLAM & State Estimation',
    blurb: 'Bayes filters, sensor fusion and building maps while moving through them.',
    domain: 'slam-estimation',
    planned: ['Legged state estimation', 'Visual-inertial odometry in detail', 'Localisation in a known map'],
  },
  {
    id: 'planning',
    name: 'Motion Planning',
    blurb: 'Sampling, search and optimization for getting from here to there without collisions.',
    domain: 'planning',
    planned: ['Task and motion planning', 'Footstep and contact planning', 'Planning under uncertainty'],
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    blurb: 'The ML and deep-learning foundations that robot learning is built on.',
    domain: 'deep-learning',
    planned: ['Supervised learning for robotics', 'Reinforcement learning', 'Imitation learning', 'Sim-to-real transfer'],
  },
  {
    id: 'vla',
    name: 'VLA & Robot Foundation Models',
    blurb: 'Vision-language-action models and generalist robot policies.',
    domain: 'vla',
    planned: ['What a VLA is', 'Action tokenization and action heads', 'Diffusion and flow policies', 'Robot data and teleoperation'],
  },
  {
    id: 'manipulation',
    name: 'Manipulation & Hands',
    blurb: 'Grasping, contact, dexterous hands and end-of-arm tooling.',
    domain: 'manipulation',
    planned: ['Grasp mechanics', 'Dexterous hand designs', 'Contact-rich control'],
  },
  {
    id: 'simulation',
    name: 'Simulation & Tooling',
    blurb: 'ROS 2, physics simulators and the software that holds a robot together.',
    domain: 'tooling-sim',
    planned: ['ROS 2 concepts', 'Physics engines compared', 'URDF, MJCF and USD'],
  },
  {
    id: 'safety',
    name: 'Safety & Standards',
    blurb: 'Functional safety, risk assessment and the standards industrial robots ship against.',
    domain: 'safety-standards',
    planned: ['Risk assessment basics', 'ISO 10218 and collaborative operation', 'Safety-rated motion and stopping'],
  },
];

export const categoryIds = categories.map((c) => c.id) as [string, ...string[]];

export function getCategory(id: string): Category {
  const found = categories.find((c) => c.id === id);
  if (!found) throw new Error(`Unknown category: ${id}`);
  return found;
}
