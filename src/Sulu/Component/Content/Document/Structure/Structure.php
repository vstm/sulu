<?php

/*
 * This file is part of the Sulu.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Component\Content\Document\Structure;

use Sulu\Component\Content\Compat\Property;

/**
 * Lazy loading container for content properties.
 */
class Structure implements StructureInterface
{
    /**
     * @var array
     */
    protected $properties = [];

    /**
     * @var array
     */
    protected $stagedData = [];

    /**
     * {@inheritDoc}
     */
    public function getStagedData()
    {
        return $this->stagedData;
    }

    /**
     * {@inheritDoc}
     */
    public function setStagedData(array $stagedData)
    {
        $this->stagedData = $stagedData;
    }

    /**
     * {@inheritDoc}
     */
    public function commitStagedData($clearMissingContent)
    {
        $this->bind($this->stagedData, $clearMissingContent);
        $this->stagedData = [];
    }

    /**
     * {@inheritDoc}
     */
    public function getProperty($name)
    {
        if (isset($this->properties[$name])) {
            return $this->properties[$name];
        }

        $property = new PropertyValue($name);
        $this->properties[$name] = $property;

        return $property;
    }

    /**
     * {@inheritDoc}
     */
    public function getContentViewProperty($name)
    {
        throw new \Exception('Cannot retrieve content view property for non-managed property');
    }

    /**
     * {@inheritDoc}
     */
    public function hasProperty($name)
    {
        return $this->offsetExists($name);
    }

    /**
     * {@inheritDoc}
     */
    public function offsetExists($offset)
    {
        return isset($this->properties[$offset]);
    }

    /**
     * {@inheritDoc}
     */
    public function offsetGet($offset)
    {
        return $this->getProperty($offset);
    }

    /**
     * {@inheritDoc}
     */
    public function offsetSet($offset, $value)
    {
        throw new \BadMethodCallException(
            'Cannot set content properties objects'
        );
    }

    /**
     * {@inheritDoc}
     */
    public function offsetUnset($offset)
    {
        unset($this->properties[$offset]);
    }

    /**
     * {@inheritDoc}
     */
    public function toArray()
    {
        $values = [];
        foreach ($this->properties as $name => $property) {
            $values[$name] = $this->normalize($property->getValue());
        }

        return $values;
    }

    /**
     * {@inheritDoc}
     */
    public function bind($data, $clearMissing = false)
    {
        foreach ($data as $key => $value) {
            $property = $this->getProperty($key);
            $property->setValue($value);
        }
    }

    public function __get($name)
    {
        return $this->offsetGet($name);
    }

    protected function normalize($value)
    {
        if ($value instanceof PropertyValue) {
            $value = $value->getValue();
        }

        if (!is_array($value)) {
            return $value;
        }

        $ret = [];
        foreach ($value as $key => $value) {
            $ret[$key] = $this->normalize($value);
        }

        return $ret;
    }
}