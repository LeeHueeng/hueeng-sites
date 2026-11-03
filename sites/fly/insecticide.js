// Dimensionless game response inspired by pyrethroid effects, not a toxicity model.
export const EXPOSURE_STATES = ['normal', 'escaping', 'agitated', 'impaired', 'knocked', 'recovering'];
export function newExposure() {
  return { dose: 0, condition: 'normal', wasKnocked: false, concentration: 0 };
}
export function advanceExposure(exposure, dt, concentration) {
  const step = Math.max(0, Math.min(.1, dt));
  const contact = Math.max(0, Math.min(1, concentration || 0));
  exposure.concentration = contact;
  exposure.dose = Math.max(0, Math.min(2.2, exposure.dose + (contact * .92 - (contact > .06 ? .025 : .16)) * step));
  if (exposure.dose >= 1.3) exposure.wasKnocked = true;
  if (exposure.wasKnocked && exposure.dose < .06) exposure.wasKnocked = false;
  if (exposure.wasKnocked && exposure.dose >= .55) exposure.condition = 'knocked';
  else if (exposure.wasKnocked) exposure.condition = 'recovering';
  else if (exposure.dose >= .65) exposure.condition = 'impaired';
  else if (exposure.dose >= .2) exposure.condition = 'agitated';
  else if (contact > .08) exposure.condition = 'escaping';
  else exposure.condition = 'normal';
  return exposure;
}
export function exposureMotion(exposure) {
  return {
    normal: { speed: 1, jitter: 0, escape: 0 },
    escaping: { speed: 1.45, jitter: .1, escape: 1.7 },
    agitated: { speed: 1.12, jitter: 1.6, escape: .75 },
    impaired: { speed: .28, jitter: .7, escape: .16 },
    knocked: { speed: 0, jitter: 0, escape: 0 },
    recovering: { speed: .5, jitter: .12, escape: 0 },
  }[exposure.condition];
}
export function cloudConcentration(position, clouds) {
  let strongest = 0, nearest = null;
  for (const cloud of clouds) {
    if (cloud.life <= 0) continue;
    const dx = position.x - cloud.x, dz = position.z - cloud.z;
    const horizontal = Math.hypot(dx, dz);
    const vertical = Math.abs(position.y - cloud.y);
    const radial = Math.max(0, 1 - horizontal / cloud.radius);
    const height = Math.max(0, 1 - vertical / 2.1);
    const freshness = Math.min(1, cloud.life / 1.3);
    const value = radial * height * freshness;
    if (value > strongest) { strongest = value; nearest = cloud; }
  }
  return { concentration: strongest, source: nearest };
}
