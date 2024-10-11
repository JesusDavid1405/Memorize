<?php

    class Usuario
    {
        private $nickName;
        private $correo;
        private $contraseña;

        public function __construct($nickName,$correo,$contraseña)
        {
            $this->nickName =$nickName;
            $this->correo =$correo;
            $this->contraseña =$contraseña;
        }

        public function setNickName()
        {
            $this->nickName;
        }
        public function getNickName()
        {
            return $this->nickName;
        }

        public function setCorreo()
        {
            $this->correo;
        }
        public function getCorreo()
        {
            return $this->correo;
        }

        public function setContraseña()
        {
            $this->contraseña;
        }
        public function getContraseña()
        {
            return $this->contraseña;
        }
        
        
    }

?>